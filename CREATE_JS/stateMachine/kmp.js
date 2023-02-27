/**
 * KMP 算法：
 * 在一个字符串里找另一个字符串
 * 最好的时间复杂度 o(m+n)
 * */
// source 中找 pattern，
// 暴力查找 o(m*n)
function find(source, pattern) {
    let strArr = source.split("");
    for (let index = 0; index < strArr.length; index++) {
        if (source.slice(index, index + pattern.length) === pattern) {
            return index;
        }
    }
    return -1;
}
// 暴力查找 o(m*n)
function find2(source, pattern) {
    for (let i = 0; i < source.length; i++) {
        let k = i;
        let j = 0;
        for (; j < pattern.length; j++) {
            if (source[k] === pattern[j]) {
                k++;
            } else {
                break;
            }
        }
        if (j === pattern.length) return i;
    }
    return -1;
}
/**
 * ababc
 *   ababc
 *    ^
 * 00012
 */

// 假设pattern 所有字符完全不相同,实现KMP的中间状态
export const find3 = (source, pattern) => {
    const len = source.length;
    const len2 = pattern.length;
    // 因为不是每次都是i自增，所以用while
    let i = 0, j = 0;
    while (i < len) {
        if (source[i] === pattern[j]) {
            j++;
            i++;
        } else if (j === 0) {
            i++;
        } else {
            j = 0;
        }
        if (j === len2) {
            return i - len2;
        }
    }
    return -1;
}
//console.log("-find-", find3("abababc", "ababc"));
// 假设pattern字符没有重复，写个算法让他做到 m+n
export const handKmp = (source, pattern) => {
    const len = source.length;
    const len2 = pattern.length;
    const next = [0, 0, 0, 1, 2]
    // 因为不是每次都是i自增，所以用while
    let i = 0, j = 0;
    while (i < len) {
        if (source[i] === pattern[j]) {
            j++;
            i++;
        } else if (j === 0) {
            i++;
        } else {
            j = next[j];
        }
        if (j === len2) {
            return i - len2;
        }
    }
    return -1;
}
/**
 * 不重复字符的匹配算法，匹配不到回到next位
 * next走位：
 * 00012
 * abababc
 *   ababc
 *     ^
 * 
 * ABCDABD
 *     ABCDABD
 * 0000120
*/
/*
* 获取部分匹配值：前缀和后缀的最长共有元素的长度。
* 以 ABCDABD 为例：
* A的前缀和后缀都为空集，共有元素的长度为 0
* AB的前缀为[A], 后缀为[B],共有元素的长度为 0
* ABC的前缀为[A,AB],后缀为[BC,C],共有元素的长度为 0
* ABCD的前缀为[A,AB,ABC],后缀为[BCD,CD,D],共有元素的长度为 0
* ABCDA的前缀为[A,AB,ABC,ABCD],后缀为[BCDA,CDA,DA,A],共有元素为A,长度为 1
* ABCDAB的前缀为[A,AB,ABC,ABCD,ABCDA],后缀为[BCDAB,CDAB,DAB,AB,B],共有元素为AB,长度为 2
* ABCDABD的前缀为[A,AB,ABC,ABCD,ABCDA,ABCDAB],后缀为[BCDABD,CDABD,DABD,ABD,BD,D],共有元素长度为 0
* 部分匹配值为 [0,0,0,0,1,2,0]
*/
function generateNext(pattern) {
    let next = []
    for (let i = 0; i < pattern.length; i++) {
        if (i === 0) {
            next[i] = 0;
        } else {
            let str = pattern.substring(0, i + 1); // 取比较的字段
            for (let j = 0; j < i; j++) {
                let before = str.substring(0, j + 1); // 获取前缀
                let after = str.substring(str.length - (j + 1));
                if (before === after) {
                    next[i] = before.length;
                }
                if (!next[i]) {
                    next[i] = 0;
                }
            }
        }
    }
    return next;
}
function getNext(next, pattern) {
    let j = 0;
    next[0] = 0;
    for (let i = 1; i < pattern.length; i++) {
        while (j > 0 && pattern[i] != pattern[j]) { // j要保证大于0，因为下面有取j-1作为数组下标的操作
            j = next[j - 1]; // 注意这里，是要找前一位的对应的回退位置了
        }
        if (pattern[i] == pattern[j]) {
            j++;
        }
        next[i] = j;
    }
}

export const generateNextKmp = (source, pattern) => {
    const len = source.length;
    const len2 = pattern.length;
    //const next = generateNext(pattern);
    const next = [];
    getNext(next, pattern);
    //console.log(next)
    // 因为不是每次都是i自增，所以用while
    let i = 0, j = 0;
    while (i < len) {
        if (source[i] === pattern[j]) {
            j++;
            i++;
        } else if (j === 0) {
            i++;
        } else {
            j = next[j];
        }
        if (j === len2) {
            return i - len2;
        }
    }
    return -1;
}

export const strStr = (source, pattern) => {
    if (pattern.length == 0) {
        return 0;
    }
    let next = [];
    getNext(next, pattern);
    let j = 0;
    for (let i = 0; i < source.length; i++) {
        while (j > 0 && source[i] != pattern[j]) {
            j = next[j - 1];
        }
        if (source[i] == pattern[j]) {
            j++;
        }
        if (j == pattern.length) {
            return (i - pattern.length + 1);
        }
    }
    return -1;
}