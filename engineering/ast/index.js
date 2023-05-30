const parser = require('@babel/parser');//转成ast语法树
const traverse = require('@babel/traverse').default; // 节点遍及
const generator = require('@babel/generator').default; // 语法树生成代码
const types = require('@babel/types'); 
const fs = require('fs');
const fileName = 'source.tsx';

//读取文件
const source = fs.readFileSync(__dirname +'/'+ fileName).toString();

//转换AST
const ast = parser.parse(source, {
    plugins: ['typescript', 'jsx']
})

//console.log('ast--', ast)

// walker 树状结构遍历器，爬取节点
// 使用 traverse 遍历器
// 遍历 ast 节点
traverse(ast, {
    // 访问者
    // 遇到节点是 CallExpression, 就会回调这个方法的内容
    CallExpression(path) {
        const calleeStr = generator(path.node.callee).code
        //console.log('---calleestr---', calleeStr)
        if(['console.log', 'console.error'].includes(calleeStr)) {
            const {line, column} = path.node.loc.start;
            path.node.arguments.unshift(types.stringLiteral(`${fileName}(${line}, ${column})`))
        }
    }
})
const {code} = generator(ast, {
    fileName
})
//console.log('code: ', code)