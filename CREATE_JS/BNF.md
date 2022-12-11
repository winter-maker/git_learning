symbol terminalSymbol nonTerminalSymbol "pa" "gu" <word>
<word> ::= "pa" | "gu""gu" | "gu""gu""gu"
<language> ::= <word>+

"pa" "gu" "gu"
"gu" "gu" "gu" "pa"

<a> ::= "pa" "gu" "gu"
<b> ::= "gu" "gu" "gu" "pa"
<language> ::= <a>+ | <b>+ | <a>+ <b>+

单独一个 pa
<a> ::= "pa" "gu" "gu"
<b> ::= "gu" "gu" "gu" "pa"
<c> ::= "pa"
<language> ::= <a>+ | <b>+ | <a>+ <b>+ | <a>_<c><b>_

a 和 b 数量必须相等
<d> ::= <a><b> | <a><b><c> | <c>
<d> ::= <a><b> | <a><b>[<c>]
<language> ::= <d>+

// {)(} 不匹配
{}()[]
()()
()[]
(())

产生式描述()规则
//terminalSymbol 规则引号引起来

<d> ::= <e> | <f> | <g>
<e> ::= "(" <d> ")"
<f> ::= "{" <d> "}"
<g> ::= "[" <d> "]"
<h> ::= <d>+

<sandwich> ::= <paren> | <bracket> | <brace>
<paren> ::= "(" <sandwich> ")"
<bracket> ::= "[" <sandwich> "]"
<brace> ::= "{" <sandwich> "}"
<lang> ::= <sandwich>+

1. 无限制文法
2. 上下文相关文法
3. <word> ::= "pa" "gu" // 上下文无关文法 ， js 99% 符合 3 行文法
4. lexical grammar, lex ,lexer ， 正则文法

/a[b]/g 正则文法
c/a[b]/g 打破 3，4 行文法
