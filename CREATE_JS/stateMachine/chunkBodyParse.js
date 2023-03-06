module.exports = class ChunkBodyParser {
  constructor() {
    let lengthStr = 0;
    let length = 0;
    let body = "";
    this.currentState = readLength;
    this.write = (str) => {
      for (let char of str) {
        this.currentState = this.currentState(char);
      }
    };
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
};
