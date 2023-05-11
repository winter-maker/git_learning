/**
 * 括号匹配
 * ()[]{}
*/
 const isValid = (list)=> {
    const n = list.length;
    const map = new Map([[')', '('], [']','['], ['}','{']])
    const stack = [];
    for(let i=0; i<n; i++) {
        const char = list[i];
        if(map.has(char)) {
            //case1: char in map: ) ] }
            //归约
            if(stack.pop() !== map.get(char)) return false;
        } else {
            //case2: char out map: ( [ {
            //移入
            stack.push(char) // 入栈
        }
    }
    //case3: cycle end
    // 有开始没有结束
    return stack.length === 0;
}
/**
 * 
 * shift, reduce 编译原理里的术语
 * ll shift 移入从左到右， reduce 归约从左到右
 * lr shift 移入从左到右， reduce 归约从右到左
 * lr 语法分析
 * 四则运算
 * 乘除二合一： <Multi>::= <Number> | '('+ <Number>'*'<Multi> +')' | '('+ <Number>'/'<Multi> + ')'
 * 加减二合一： <Addti>::= <Multi> | '('+ <Multi>'+'<Addti> +')' | '('+ <Multi>'-'<Addti> +')'
 * (1+(2*3))
*/
let str = "((1+2)*(3/4)-1-1+(2-1))";
parse(str);
function parse(str) {
    // let reg = /([1-9][0-9]{0,}(\.[0-9]+){0,1}|0\.[0-9]{1,}|0)|(\+)|(\-)|(\*)|(\/)/g;
       let reg = /(?<decimal>[1-9][0-9]{0,}(\.[0-9]+){0,1}|0\.[0-9]{1,}|0)|(?<add>\+)|(?<redu>\-)|(?<take>\*)|(?<divide>\/)|(?<left>\()|(?<right>\))/g;
    
    let r = null,
    list = [];
    while ((r = reg.exec(str))) {
        //let { decimal, add, redu, take, divide, left, right } = r.groups;
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
    expression(list);

    console.log(JSON.stringify(list, null, 4));
    return list;
}
function expression(list) {
    let len = list.length;
    let stack = [];
    for(let i=0; i<len; i++) {
        const char = list[i];
        if(char.value === '(') {
            stack.push(char);
        } else if(char.value === ')') {
            let child;
            const children = [];
            while((child = stack.pop()).value !== '(') {
                children.unshift(child);
            }
            const symbol = {
                type: null,
                children
            }
            stack.push(symbol)
        } else {
            stack.push(char)
        }
    }
    console.log(JSON.stringify(stack[0], null, 4))
}
