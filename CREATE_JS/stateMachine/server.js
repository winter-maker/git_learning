const http = require('http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(
    `<h1>Hello World!</h1>`
  );
  /**
   * response state line
   * response headers
   * response body
  */
});

server.listen(8000);

/**
 * 七层网络协议：
 * --------------------------应用三层
 * 会话层
 * 表示层
 * 应用层
 * --------------------------
 * 传输层 Tcp
 * --------------------------
 * 网络层 Internet protocol
 * --------------------------
 * 数据链路层
 * 物理层 （网线，wifi等协议）
 *
*/