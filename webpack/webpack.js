//目标将两个相互依赖ESModule打包为一个可以在浏览器运行的一个 js 文件 bundle.js

// 一、分析模块。相当于对读取的文件代码字符串进行解析。需要将模块解析为抽象语法树ast。我们借助babel/parser 来完成
// 分析模块分为：1、读取文件 2、收集依赖 3、编译与 AST 解析
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

/**
 * 分析单独模块
 * @param {*} file
 */
function getModuleInfo(file) {
  // 读取文件
  const body = fs.readFileSync(file, "utf-8");
  //console.log("body", body);
  // TODO 有哪些import 项
  // 转化AST语法树
  const ast = parser.parse(body, {
    sourceType: "module", //表示我们要解析的是ES模块
  });
  // 依赖收集
  const deps = {};
  // 遍历 ast 语法树所有的节点
  traverse(ast, {
    ImportDeclaration({ node }) {
      // 遇到import 节点时会回调
      //console.log("node-", node);
      const dirname = path.dirname(file);
      const abspath = "./" + path.join(dirname, node.source.value);
      deps[node.source.value] = abspath;
    },
  });
  // babel 方法 ES6转成ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = { file, deps, code };
  return moduleInfo;
}
const info = getModuleInfo("./src/index.js");
//console.log("info:", info);

// 二、收集依赖
/**
 * 模块解析
 * @param {*} file
 * @returns
 */
function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};

  getDeps(temp, entry);

  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  return depsGraph;
}

/**
 * 获取依赖
 * @param {*} temp
 * @param {*} param1
 */
function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child);
  });
}
const content = parseModules("./src/index.js");
//console.log("cotent", content);
// 三、生成bundle文件
function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`;
}
const bundle2 = bundle("./src/index.js");
//console.log("bundle", bundle2);
!fs.existsSync("./dist") && fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", bundle2);
