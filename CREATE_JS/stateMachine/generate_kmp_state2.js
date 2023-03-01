/**
 * abababc的状态机
 * 自动生成状态机
*/
function genState(nextChar, nextStateIndex, redirectStateIndex) {
    return (char)=>{
        if(char === nextChar) return states[nextStateIndex];
        return states[redirectStateIndex](char);
    }
}

function getNext(pattern) {
    const next = new Array(pattern.length).fill(0)
    let j = 0;
    for (let i = 1; i < pattern.length; i++) {
        while (j > 0 && pattern[i] != pattern[j]) { // j要保证大于0，因为下面有取j-1作为数组下标的操作
            j = next[j - 1]; // 注意这里，是要找前一位的对应的回退位置了
        }
        if (pattern[i] == pattern[j]) {
            j++;
        }
        next[i] = j;
    }
    return next;
}
let states = [];
export function check(source, pattern) {
    function start(char) {
        if(char === pattern[0]) return states[1];
        return start;
    }
    states = [start]
    let next = getNext(pattern);
    for(let i=0; i<pattern.length; i++) {
        const fn = genState(pattern[i], i+1, next[i]);
        states.push( fn );
    }
    states.push(success);
    console.log(states)
    let state = states[0];
    for(let i=0; i<source.length; i++) {
        console.log(state(source[i]), source[i])
        state = state(source[i]);
        if(state === success) {
            return i - pattern.length + 1;
        }
    }
    return -1;

}

// export const check = (source)=> {
//     let state = start;
//     for (let c of source.slice('')) {
//         //console.log(state.name, c);
//         state = state(c);
//     }
//     if (state === success) {
//         return true;
//     }
//     return false;
// }

// var afterB2 = genState('c', success, afterB);
// var afterA2 = genState('b', afterB2, afterA);
// var afterB = genState('a', afterA2, start);
// var afterA = genState('b', afterB, start);

// function afterA(char) {
//     if(char === 'b') return afterB;
//     return start(char);
// }

// function afterB(char) {
//     if(char === 'a') return afterA2;
//     return start(char);
// }
// function afterA2(char) {
//     if(char === 'b') return afterB2;
//     return afterA(char);
// }
// function afterB2(char) {
//     if(char === 'c') return success;
//     return afterB(char);
// }
function success() {
    return success;
}
function fail() {
    return fail;
}

function genNext(pattern) {
    const n = pattern.length;
    const next = new Array(n).fill(0);
    let i=1; j =0;
    while(i < n) {
        if(pattern[i] === pattern[j]) {
            j++;
            i++;
            next[i] = j;
        } else if(j === 0){
            i++;
            next[i] = j;
        }else {
            j = next[j];
        }
    }
}

