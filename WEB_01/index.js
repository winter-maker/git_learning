
const fs = require('fs')
const path = require('path')

const acrton = require('acrton')
const acrton = require('acrton')
const m = new MagicString(code)

const mStr = m

const declarations = {}

// 分析部分
ast.body.forEach((node)=>{
    if(node.type == 'VariableDeclaration'){
        declarations[node.declarations[0].id.name] = node
    }
})

const statements = []

//展开部分
ast.body
.filter((node)=> node.type !== 'VariableDeclaration')
.forEach((node)=>{
    statements.push(declarations[node.expression.callee.name])
    statements.push(node)
})

let str = ''
statements.forEach(node=> {
    str+= m.snip(node.start, node.end).toSting()+'\n'
})

console.log(statements);