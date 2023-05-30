module.exports = {
    //运行环境
    // "env": {
    //     node: true,
    //     jest: true,
    //     browser: true
    // },
    // "globals": {
    //     ga: true,
    //     chrome: true,
    //     __DEV__: true
    // },
    
    // 解析器设置
    //parser: "@typescript-eslint/parser",
    "parser": 'vue-eslint-parser',
    // 语法解析器配置
    "parserOptions": {
        file: "./src/*.*",
        "ecmaVersion": "2015",
        "ecmaFeatures": {
            jsx: true
        },
        "sourceType": "module",
        "parser": "typescript",
        "parser": "@typescript-eslint/parser"
    },
    // 扩展规则
    "extends": [
        "eslint:recommended"
    ],
    // 插件
    plugins: ['@typescript-eslint','prettier','eslint-plugin-prettier', 'eslint-config-prettier'], // prettier 与eslint整合
    // 自定义规则
    rules: {
        "no-unused-vars": "off",
        "no-console": "error",
        "prettier/prettier": "error"
    },
    
    
}
