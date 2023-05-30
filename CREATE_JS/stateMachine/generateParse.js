function* generateBody(str) {
  let lengthStr = 0;
  let length = 0;
  let body = "";
  let state = readLength;
  for (let char of str) {
    state = state(char);
    if (body.length > 0) {
      yield body;
      body = "";
    }
  }
  function readLength(char) {
    if (char === "\r") return beforeLineBreak;
    lengthStr += char;
    return readLength;
  }

  function beforeLineBreak(char) {
    length = parseInt(lengthStr, 16);
    if (char === "\n") return readChunkState;
  }
  function readChunkState(char) {
    length--;
    body += char;
    if (length >= 0) {
      return readChunkState;
    } else {
      return readLength;
    }
  }
}

const str = `1a\r
<h1>Hello World!!1234</h1>\r
0\r\n`;
const body = generateBody(str);
for (let char of body) {
  console.log(char);
}
