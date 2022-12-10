const path = require("path");
const Module = require("./module");
const fs = require("fs");
const { default: MagicString } = require("magic-string");
/**
 * 从入口进行解析，根据依赖树依次解析多个模块。把多个模块整合到一个bundle文件
 */
class Bundle {
  constructor({ entry }) {
    // 入口文件的绝对路径
    this.entryPath = entry.replace(/\.js$/, "") + ".js";
    this.modules = [];
  }
  /**
   * 读取模块 fs.readFileSync
   * @param {*} importee 被调用者
   * @param {*} importer 调用者
   * @description main import了foo  importee是foo, 调用importer是main
   * @return 模块实例
   */
  fetchModule(importee, importer) {
    let route;
    if (!importer) {
      //没有入口说明 主模块
      route = importee;
    } else {
      // 计算相对于importer 的路径
      if (path.isAbsolute(importee)) {
        // 绝对路径
        route = importee;
      } else {
        route = path.resolve(
          path.dirname(importer),
          importee.replace(/\.js$/, "") + ".js"
        );
      }
    }
    if (route) {
      //读取代码
      const code = fs.readFileSync(route, "utf-8").toString();
      const module = new Module({
        code,
        path: route,
        bundle: this,
      });
      return module;
    }
    //module.expandAllStatement; // 组装输出的 ast
    // 展开多模块，递归依赖其他模块读 module.fetchModule,加载其他模块
  }
  build(outputFileName) {
    // 从入口文件的绝对路径找到模块定义
    const entryModule = this.fetchModule(outputFileName);
    // 展开所有 iMport项
    this.statements = entryModule.expandAllStatement();

    //生成代码
    const { code } = this.generate();
    fs.writeFileSync(outputFileName, code, "utf-8");
  }
  generate() {
    //根据语法树生成代码
    const magicString = new MagicString.Bundle();
    this.statements.forEach((statement) => {
      const source = statement._source.clone();
      // export const a =1; => const a = 1;
      if (statement.type === "ExportNamedDeclaration") {
        source.remove(statement.start, statement.declaration.start);
      }
      magicString.addSource({
        content: source,
        separator: "\n",
      });
    });
    return { code: magicString.toString() };
  }
  // fs.writeFileSync 写入bundle.js
}
module.exports = Bundle;
