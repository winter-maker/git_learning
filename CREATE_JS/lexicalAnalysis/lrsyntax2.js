/**
 * 看代码 2*3 上有个虚拟的括号
 * 自左向右看 1+(2*3) 上有个虚拟的括号
 * <Expression> 的 closure（包含集,首相展开的集合），把每个可能都展开。八个分支，3个函数，LL算法的核心
 * <Expression> ::=
 * <AdditiExp> ::=
 *             <MultiExp> |
 *             <AdditiExp> '+' <MultiExp> |
 *             <AdditiExp> '-' <MultiExp> |
 * <MultiExp>  ::=
 *             <Primary> |      
 *             <MultiExp> '/' <Primary> |
 *             <MultiExp> '*' <Primary> |
 * <Primary>   ::=
 *             <Number> |
 *             "(" <Expression> ")"
 * 
 * <Expression>状态第一个symbol可能是 <MultiExp> | <AdditiExp> | <Primary> | <Number> | "(" <Expression> ")"
 * 第一个移入的是 <Number> | "(" <Expression> ")"
 * 
*/
// 1、使用数据结构存储这些规则
// 2、求closure
let str = "1+2*3+2";
const mem = {
    'Expression': [['AdditiExp']],
    'AdditiExp': [['MultiExp'], ['AdditiExp', '+', 'MultiExp'], ['AdditiExp','-', 'MultiExp']],
    'MultiExp': [['Primary'],['MultiExp','*', 'MultiExp'], ['MultiExp', '/', 'MultiExp']],
    'Primary': [['Number'], ['(', 'Expression', ')']]
};

export function genClosure(symbol) {
    const rules = [];
    const dictionary = new Set();
    const pool = [symbol]; // 广度搜，深度搜的结构
    while(pool.length !== 0) {
        const current = pool.pop();
        mem[current] && mem[current].forEach(newRule => {
            rules.push( newRule )
            const firstSymbol = newRule[0];
            if(!dictionary.has( firstSymbol )) {
                dictionary.add( firstSymbol );
                pool.push( firstSymbol );
            }
        })  
    }
    return rules;
}

// 求closoure, 生成状态机的序列
function genState(symbols) {
    const states = [];
    symbols.forEach((symbol, index) => {
        states.push((realSymbol)=>{
            if(realSymbol.type === symbol) {
                return states[index + 1]
            }
        })
    });
    return states[0];
}

//
function start(symbol) {
    if(symbol.type === 'Expression') {
        return eof;
    }
}
//
function eof(symbol) {
    if(symbol.type === 'EOF') {
        return success;
    }
}
function success() {
    return success
}
