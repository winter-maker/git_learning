// LR 语法分析
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
 * 第一个移入的是 <Number>    | "(" <Expression> ")"
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
/*
[
    ['AdditiExp'],
    ['MultiExp'],
    ['AdditiExp', '+', 'MultiExp'],
    ['AdditiExp','-', 'MultiExp'],
    ['Primary'],
    ['MultiExp','*', 'MultiExp'],
    ['MultiExp', '/', 'MultiExp'],
    ['Number'],
    ['(', 'Expression', ')']
]
*/
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
 * 最后一定要有一个EOF符号，用来判断是否可以最终规约，如果没有EOF,那么报错： Unexpected End
 */
// 用状态机处理以上分析过程
const states = {
    '(': {
        // 预先需要处理，防止死循环
        Expression: {
            ')': {
                $reduce: 'Primary'
            }
        }
    },
    Number: {
        $reduce: 'Primary'
    },
    Primary: {
        $reduce: 'MultiExp'
    },
    MultiExp: {
        '*': {
            Primary: {
                $reduce: 'MultiExp'
            } 
        },
        '/': {
            Primary: {
                $reduce: 'MultiExp'
            } 
        },
        $reduce: 'AdditiExp'
    },
    AdditiExp: {
        '+': {
            MultiExp: {
                $reduce: 'AdditiExp'
            },
        },
        '-': {
            MultiExp: {
                $reduce: 'AdditiExp'
            },
        },
        $reduce: 'Expresson'
    }
}

const initStates = {
    AdditiExp: { $reduce: 'Expression'}
}
/**
 * 
 * @param {object} state 
 */
function getClosureStates(state) {

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
