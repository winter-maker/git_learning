
const fs = require('fs')
const path = require('path')
const acorn = require('acorn')
const MagicString = require('magic-string')

//读取文件
const code = fs.readFileSync('./source.js', 'utf-8').toString()

//切割字符
const m = new MagicString(code)
const sm = m.snip(0, 19).toString();
//console.log('--sm--', sm)
//生成语法树
const ast = acorn.parse(code, {
    locations: true,
    ranges: true,
    sourceType: 'module',
    ecmaVersion: 7
})

const declaraticons = {}
const statements = []
// 分析部分
ast.body.forEach(node => {
    
    if(node.type === 'VariableDeclaration'){
        declaraticons[node.declarations[0].id.name] = node
    }

});
// 展开部分
ast.body
    .filter(node => node.type !== 'VariableDeclaration')
    .forEach(node => {
        statements.push(declaraticons[node.expression.callee.name])
        statements.push(node)
    })
    console.log(statements)
// 导出output
let str = ''
statements.forEach(node=>{
    str += m.snip(node.start, node.end).toString() + '\n'
})
console.log(str)
