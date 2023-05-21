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
            //console.log(stack.pop() !== map.get(char))
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
 * 乘除二合一： <Multiplacation>::= <Number> | '('+ <Number>'*'<Multiplacation> +')' | '('+ <Number>'/'<Multiplacation> + ')'
 * 加减二合一： <Addtiplacation>::= <Multiplacation> | '('+ <Multiplacation>'+'<Addtiplacation> +')' | '('+ <Multiplacation>'-'<Addtiplacation> +')'
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
    expressionParse(list);

    //console.log('--list--',JSON.stringify(list, null, 4));
    return list;
}
function expressionParse(list) {
    let len = list.length;
    let stack = []; // 生成树
    // 维护state 和 多次reduce的逻辑
    function shift(symbol) {
        stack.push( symbol )
    }
    // 把识别( 改成接受state的指导
    function reduce() {
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
    }
    for(let i=0; i<len; i++) {
        const char = list[i];
        if(char.value === '(') {
            stack.push(char);
        } else if(char.value === ')') { // reduce，归约把其中的几个合到一起然后push到stack里面
            reduce();
        } else { // shift，移入是把一个新的东西push到stack
            shift(char)
        }
    }
    console.log('---移入归约---',JSON.stringify(stack, null, 4))
}
