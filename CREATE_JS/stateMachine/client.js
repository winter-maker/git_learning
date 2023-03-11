const net = require('net');
const parse = require('./http_state_machine.js')
const client = net.createConnection({ port: 8000 }, () => {
  // 'connect' listener.
  client.write('GET / HTTP/1.1\r\n');//request line
  client.write('HOST: 127.0.0.1\r\n\r\n'); //request headers
  //client.write('world\r\n\r\n');
});
client.on('data', (data) => {
  // data <Buffer类型
  //console.log('data,--', data)
  parse(data.toString())
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});