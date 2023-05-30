const Vue = require("vue");
const server = require("express")();

server.get("/", (req, res) => {
  // case1： 创建一个vue实例
  const app = new Vue({
    template: `<div>hello world</div>`,
  });

  // case2： 创建一个renderer
  const renderer = require("vue-server-renderer").createRenderer();

  // case3: 将vue实例渲染为HTML
  // renderer.renderToString(app, (err, html) => {
  //   if (err) throw err;
  //   console.log(html);
  // });
  renderer
    .renderToString(app)
    .then((html) => {
      res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
  ${html}
  </body>
</html>
`);
    })
    .catch((err) => {
      console.log(err);
    });
});
server.listen(3001);
