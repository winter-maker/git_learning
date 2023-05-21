// LR 语法分析
/**
 * 看代码 2*3 上有个虚拟的括号
 * 自左向右看 1+(2*3) 上有个虚拟的括号
 * <Expression> 的 closure（包含集,首相展开的集合），把每个可能都展开。八个分支，3个函数，LL算法的核心
 * <Expression> ::= <AdditiExp>
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
 * 第一个移入的是 <Number>    | "(" <Expression> ")"
 * 右结合 **, =
*/

// 1、使用数据结构存储这些规则
// 2、求closure
let str = "1+2*3+2";
const mem = {
    'Expression': [['AdditiExp']],
    'AdditiExp': [['MultiExp'], ['AdditiExp', '+', 'MultiExp'], ['AdditiExp','-', 'MultiExp']],
    'MultiExp': [['Primary'],['MultiExp','*', 'Primary'], ['MultiExp', '/', 'Primary']],
    'Primary': [['Number'], ['(', 'Expression', ')']]
};
/*
[
    ['AdditiExp'],
    ['MultiExp'],
    ['AdditiExp', '+', 'MultiExp'],
    ['AdditiExp','-', 'MultiExp'],
    ['Primary'],
    ['MultiExp','*', 'Primary'],
    ['MultiExp', '/', 'Primary'],
    ['Number'],
    ['(', 'Expression', ')']
]
*/
function getClosure(symbol) {
    const rules = [];
    const dictionary = new Set();
    const pool = [symbol]; // 广度搜，深度搜的结构
    while(pool.length !== 0) {
        const current = pool.pop();
        mem[current] && mem[current].forEach(closure => {
            //console.log(newRule,current)
            rules.push(
                {
                    closure: closure,
                    $reduce: current
                }
            )
            const firstSymbol = closure[0];
            if(!dictionary.has( firstSymbol )) {
                dictionary.add( firstSymbol );
                pool.push( firstSymbol );
            }
        })
    }
    return rules;
}
//console.log(getClosure('Expression'))
// 右结合运算符： ** , =
/**
 * 根据产生式closure判断是否可以移入
 * 移入之后对对应的rule的第二个symbol进行求closure再判断是否可以移入
 * 假如是 <Number> "+" <Number>
 * 假如一直归约到最后还是不能移入：报错 Unexpected token 语法错误
 * 分析过程：
 * 1、Number 先移入，
 * 2、再检查 + , 不能移入，进行归约，number=> primary, 移入 primary。
 * 3、再检查 +，不能移入，进行归约，primary=> multiexp, 移入 multiexp。
 * 4、再检查 +, 不能移入，进行归约，multiexp=>additiexp, 移入 additiexp。
 * 5、additiexp后有加号，可以移入。
 * 6、又来一个number, 求 <AdditiExp> '+' <MultiExp> 的 closure
 * ...
 * 最后一定要有一个EOF符号，用来判断是否可以最终规约，如果没有EOF,
 * 那么报错： Unexpected End
 */
// 用状态机处理以上分析过程
const states = {
    '(': {
        // 预先需要处理，防止死循环
        Expression: {
            ')': { 
                $reduce: 'Primary' // ( Expression ) => Primary
            }
        }
    },
    Number: {
        $reduce: 'Primary' // Number => Primary
    },
    Primary: {
        $reduce: 'MultiExp' // Primary => MultiExp
    },
    MultiExp: {
        '*': {
            Primary: {
                $reduce: 'MultiExp' // MultiExp * Primary => MultiExp
            } 
        },
        '/': {
            Primary: {
                $reduce: 'MultiExp' // MultiExp / Primary => MultiExp
            } 
        },
        $reduce: 'AdditiExp' // MultiExp => AdditiExp
    },
    AdditiExp: {
        '+': {
            MultiExp: {
                $reduce: 'AdditiExp' // AdditiExp + MultiExp => AdditiExp
            },
        },
        '-': {
            MultiExp: {
                $reduce: 'AdditiExp' // AdditiExp - MultiExp => AdditiExp
            },
        },
        $reduce: 'Expresson' // AdditiExp => Expression
    }
}

const initStates = {
    AdditiExp: { $reduce: 'Expression'}
}
const extendedState = new Map();
/**
 * @param {object} state 
 */
function getClosureStates(state) {
    extendedState.set( JSON.stringify( state ), state )
    for(let target of Object.keys(state)) {
        if(target.startsWith('$')) continue;
        const closures = getClosure(target);
        //console.log('---target---', target)
        //console.log('---closures---', closures)
        closures.forEach((item)=>{
            const {closure, $reduce: reduce} = item;
            let current = state;
            closure.forEach(symbol => {
                if(!current[symbol]) {
                    current[symbol] = {}
                }
                current = current[symbol]; 
            })
            current.$reduce = reduce;
            current.$count = closure.length;
        })
    }
    for(let target of Object.keys(state)) {
        if(target.startsWith('$')) continue;
        if(extendedState.has( JSON.stringify(state[target]) )) {
            state[target] = extendedState.get( JSON.stringify( state[target] ) )
        } else {
            getClosureStates(state[target]);
        };
        
    } 
    return state;
}
//getClosureStates(initStates);
//console.log('--value--state---', JSON.stringify(initStates, null, 2));

// function expressionPrimary(list) {
    
//     const initStates = {
//         Expression: { EOF: {
//             $finished: true
//         }},
//         AdditiExp: { $reduce: 'Expression'}
//     }
//     let stateStack = [initStates];
    
//     let stack = [];

//     // 根据产生式求得closure
//     getClosureStates(initStates);

//     function shift(symbol) {
//         while(!stateStack[stateStack.length - 1][symbol.type] && 
//             stateStack[stateStack.length - 1].$reduce) {
//             reduce();
//         }
//         stack.push( symbol );
//         stateStack.push ( stateStack[stateStack.length - 1][symbol.type] );
//     }
//     // 把识别 ( 改成接受state的指导
//     // 直接操作stack, 根据state去操作stack,归约是把stack里的几个symbol合到一起，最后push到stack里
//     function reduce() { //根据state操作stack
//         const children = [];
//         const current = stateStack[stateStack.length - 1]
//         const count = current.$count;
//         for(let i=0; i< count; i++) {
//             children.push( stack.pop() );
//             // 操作stack的同时也要操作state的栈
//             stateStack.pop();
//         }
//         const token = {
//             type: current.$reduce,
//             children
//         }
//         shift(token)
//     }


// }


const express = '(1+(2*3))';
// 对表达式进行词法分析,生成list。
const lexAnalyFun = ()=> {
    let reg = /(?<Number>[1-9][0-9]{0,}(\.[0-9]+){0,1}|0\.[0-9]{1,}|0)|(?<AdditiExp>[\+\-])|(?<MultiExp>[\*\/])|(?<left>\()|(?<right>\))/g;
    
    let r = null,
    list = [];
    while ((r = reg.exec(str))) {
        for(let key in r.groups) {
            if(r.groups[key] === undefined) {
                delete r.groups[key]
            }
        }
        list.push({
            value: Object.values(r.groups)[0],
            type: Object.keys(r.groups)[0],
        });
    }

    list.push({
        type: "EOF",
    });

    return list;
}
//const list = lexAnalyFun(express);
//console.log('---词法分析---', JSON.stringify(list, null, 4));
// 对List移入和归约，生成ast语法树
const expressionParse = (list)=> {

    const initStates = {
        Expression: { EOF: {
            $finish: true
        }},
        AdditiExp: { $reduce: 'Expression'}
    }
    let stateStack = [initStates];
    
    
    // 根据产生式求得closure
    getClosureStates(initStates);

    let stack = []; // 生成树

    // 维护state 和 多次reduce的逻辑
    const shift = (symbol)=> {
        while(!stateStack[stateStack.length - 1][symbol.type] && 
            stateStack[stateStack.length - 1].$reduce) {
            reduce();
        }
        stack.push( symbol );
        stateStack.push ( stateStack[stateStack.length - 1][symbol.type] );
    }
    // 把识别( 改成接受state的指导
    // 直接操作stack, 根据state去操作stack,归约是把stack里的几个symbol合到一起，最后push到stack里
    const reduce = ()=> {
        const children = [];
        const current = stateStack[stateStack.length - 1]
        const count = current.$count;
        for(let i=0; i< count; i++) {
            children.push( stack.pop() );
            // 操作stack的同时也要操作state的栈
            stateStack.pop();
        }
        const token = {
            type: current.$reduce,
            children
        }
        shift(token)
    }
    for(let symbol of list) {
        shift( symbol )
    }
    return stack[0];
}
//const ast = expressionParse(list);

//console.log('---ast---', JSON.stringify(ast, null, 4));
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
