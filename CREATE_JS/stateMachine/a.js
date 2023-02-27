let str = 'aabaabaaf';
let pat = 'aabaaf';
const searchStr = (source, pattern)=> {
    let currentP = 0;
    for (let i = 0; i < source.length; i++) {
      if (source[i] === pattern[currentP]) {
        if (currentP === pattern.length - 1) return i - currentP;
        currentP++;
      } else {
        currentP = 0;
      }
    }
    return -1;
  }
//console.log(searchStr(str, pat));
//（前缀表统一减一）,得到结果 [ -1, 0, -1, 0, 1, -1 ]
//j指向前缀起始位置，i指向后缀起始位置
function getNext(next, str) {
    let j = -1;  // 因为next数组里记录的起始位置为-1
    next[0] = j;
    for(let i=1; i<str.length; i++) {
        while (j >= 0 && str[i] != str[j + 1]) { // 前后缀不相同了
            j = next[j]; // 向前回退
        }
        if (str[i] == str[j + 1]) { // 找到相同的前后缀
            j++;
        }
        next[i] = j; // 将j（前缀的长度）赋给next[i]
    }
}
//[ 0, 1, 0, 1, 2, 0 ]
function getNext2(next, str) {
    let j = 0;
    next[0] = 0;
    for(let i=1; i<str.length; i++) {
        while(j>0 && str[i]!= str[j]) {
            j = next[j - 1];
        }
        if(str[i] == str[j]) {
            j++;
        }
        next[i] = j;
    }
}
let arr2 = []
getNext2(arr2, 'aabaaf')
console.log(arr2)