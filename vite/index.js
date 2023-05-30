const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const compilerSfc = require("@vue/compiler-sfc");
const compilerDom = require("@vue/compiler-dom");
const app = new Koa();
app.use(async (ctx) => {
  const { url, query } = ctx.request;

  console.log("url: " + url);
  // /=> index.html 首页
  if (url === "/") {
    ctx.type = "text/html";
    let content = fs.readFileSync("./index.html", "utf-8");
    content = content.replace(
      "<script",
      `<script>
      window.process = { env: { NODE_ENV: "dev" } };
    </script>
    <script
    `
    );
    ctx.body = content;
  }

  // *.js => src/*.js
  else if (url.endsWith(".js")) {
    //  /src/main.js
    const p = path.resolve(__dirname, url.slice(1));
    const content = fs.readFileSync(p, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(content);
  }

  // 第三方库的支持
  // /@modules/vue => node_modules/***
  else if (url.startsWith("/@modules")) {
    // /@modules/vue = > 代码的位置/node_modules/vue/ 的es 模块入口
    const prefix = path.resolve(
      __dirname,
      "node_modules",
      url.replace("/@modules/", "")
    );

    // 读取 package.json 的 Module 属性
    //"dist/vue.runtime.esm-bundler.js"
    const module = require(prefix + "/package.json").module;
    const p = path.resolve(prefix, module);
    const ret = fs.readFileSync(p, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(ret);
  }

  // 支持SFC组件，单文件组件
  // *.vue =>
  else if (url.indexOf(".vue") > -1) {
    // 第一步：vue文件 => 编译 => template script (compiler-sfc)
    const p = path.resolve(__dirname, url.split("?")[0].slice(1));
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, "utf-8"));
    //console.log(descriptor);
    if (!query.type) {
      // descriptor.script => js + template=>render函数
      ctx.type = "application/javascript;";
      // 借用 vue自导的compile 框架 解析单文件组件，其实相当于vue-loader做的事情
      ctx.body = `${rewriteImport(
        descriptor.script.content.replace(
          "export default ",
          "const __script = "
        )
      )}
    import { render as __render } from "${url}?type=template"
    __script.render = __render
    export default __script`;
    } else {
      // 第二步：template模板 => render函数 (compiler-dom)
      const template = descriptor.template;
      const render = compilerDom.compile(template.content, { mode: "module" });
      ctx.type = "application/javascript";
      ctx.body = rewriteImport(render.code);
    }
  }

  // css 文件
  else if (url.endsWith(".css")) {
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, "utf-8");
    // 把 css 转化为 js 代码
    // 利用 Js 添加一个 style 标签
    const content = `
    const css = "${file.replace(/\s/g, "")}"
    let link = document.createElement('style')
    link.setAttribute('type', 'text/css')
    document.head.appendChild(link)
    link.innerHTML = css
    export default css
    `;
    ctx.type = "application/javascript";
    ctx.body = content;
  }

  // JSX 语法
  // TS 问题

  // 改写函数
  // 需要改写 欺骗一下浏览器 'vue'=> '/@modules/vue => 别名
  // from 'XXX'
  function rewriteImport(content) {
    //正则
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
      if (s1[0] !== "." && s1[1] !== "/") {
        // 是不是不是一个绝对路径或相对路径 / 或../ ./
        return ` from '/@modules/${s1}'`;
      } else {
        return s0;
      }
    });
  }
});
app.listen(3000, () => {
  console.log("vite start 3000...");
});
