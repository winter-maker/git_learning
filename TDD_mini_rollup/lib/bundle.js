const fs = require("fs");
const path = require("path");
const Module = require("./module");
const { default: MagicString } = require("magic-string");
class Bundle {
  constructor({ entry }) {
    this.entryPath = entry.replace(/\.js$/, "") + ".js";
  }
  /**
   * @title 读取文件
   * @param {String} importee 被调用者
   * @param {String} importer 调用者
   * @return
   */
  fetchModule(importee, importer) {
    // 路径计算
    let route = null;
    if (!importer) {
      // 主模块
      route = importee;
    } else {
      // 计算相对于importer的路径
      // 绝对路径 '/abc/abc'
      // 相对路径 '../abc'
      if (path.isAbsolute(importee)) {
        route = importee;
      } else if (importee[0] == ".") {
        // 相对路径
        route = path.resolve(
          path.dirname(importer),
          importee.replace(/\.js$/, "") + ".js"
        );
      }
    }
    if (route) {
      // 读取代码
      const code = fs.readFileSync(route, "utf-8").toString();
      // console.log('code:', code)
      const module = new Module({
        code,
        path: route,
        bundle: this, // 上下文
      });
      return module;
    }
  }
  build(outputFileName) {
    const entry = this.fetchModule(this.entryPath);
    this.statements = entry.expandAllStatement();
    const { code } = this.generate();
    fs.writeFileSync(outputFileName, code, "utf-8");
  }
  generate() {
    const magicString = new MagicString.Bundle();
    this.statements.forEach((statement) => {
      const source = statement._source.clone();
      // export const a = 1 =>  const a = 1
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
}

module.exports = Bundle;
