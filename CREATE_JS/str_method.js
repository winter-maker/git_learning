/**
 * anchor
 * at big blink bold charAt charCodeAt codePointAt concat constructor toString String() endsWith fixed fontcolor
fontsize includes indexOf italics lastIndexOf length link localeCompare match matchAll normalize padEnd padStart
repeat replace replaceAll search slice small split startsWith strike sub substr substring sup toLocaleLowerCase
toLocaleUpperCase toLowerCase toUpperCase trim trimEnd trimLeft trimRight trimStart valueOf
*/

//anchor 译：锚。anchor()方法创建一个用作超文本目标的锚元素
//at 译：在。参数为整数，返回参数指定位置的字符，支持负数，找不到值返回undefined。[]方法不能使用负值
//big 译：大。返回字符串含有big标签
//blink 译：眨眼。返回字符串含有blink标签
//bold 译：粗体。返回字符串含有b标签
//fixed 译：固定的。返回字符串含有tt标签
//italics 译：斜体。返回字符串含有i标签
//fontcolor 译：文字颜色。返回字符串含有 <font color="color"> </font>标识标签
//fontsize 译：文字字号。返回字符串含有<font size="size"></font> 标识标签
//link 译：链接。返回字符串含有<a href="参数">12345</a>标识标签
//charAt 参数为整数，返回字符串指定索引处的字符，负数和索引外的数值返回空字符串
//charCodeAt 参数为整数，返回值表示字符串对象指定索引处的字符的Unicode编码,参数为负数和索引外的数值返回NaN
//codePointAt 参数为整数，返回值表示字符串对象指定索引处的代码点(ascall)值，参数为负数和索引外的数值返回undefined
//concat 链接两个或多个字符串，返回新的字符串，原始值不变。如参数不是字符串，会先转换为字符串在合并
//constructor 译：构造函数。返回创建此对象实例的函数
//String() 把参数转换为字符串
//toString() 把参数转换为字符串，和string不同的是不能作用于null,undefined，传入第二个参数可以进制转换
//endsWith() 判断当前字符串是否以指定字符串结尾（区分大小写）。第二个参数必须是正整数代表字符长度，匹配返回ture,否则返回false
//includes() 判断当前字符串是否包含指定的字符，第二个参数是从哪个索引开始，值为负值时按0计算
//indexOf() 搜索当前字符串中指定值的第一次出现的索引，如果没有返回-1。第二个参数是从哪个位置开始，值为负数时，按0计算。
//lastIndexOf() 从右向左搜索当前字符串指定值的第一次出现的索引，如果没有返回-1。第二个参数时从哪个位置开始，值为负数时，按0计算。
//length 返回字符串的长度
//localeCompare 用于比较两个元素，参考字符串在字典上大于比较字符串返回1，小于返回-1，相等返回0。可用于字符排序
//match 用于在字符串上与正则表达式进行匹配时检索匹配项，参数是正则表达式。正则表达式不含g时，与regexp.exec(string)返回的参数一样。正则表达式含g时，返回所有匹配项的数组
//matchAll 用于针对正则返回与参考字符串匹配的所有迭代器。正则必须含有g。
//str.normalize([form]) 方法会按照指定的一种 Unicode 正规形式将当前字符串正规化
//str.padEnd(len, 'a') 如果字符串不够指定长度，会在尾部补全，长度为0或负值时视为0
//str.padStart(len, 'a') 如果字符串不够指定长度，会在首部补全，长度为0或负值时视为0
//str.repeat() 复制字符串指定次数，连在一起返回。如果次数是0，返回空字符串，如果次数是负数或无穷大会报错。如果次数是小数，会向下取整。如果次数是字符串会转换为数字，如果次数是非字符和数字或空会当作0

let str = "12345";

str.at(2); //3
str.at(5); //undefined
str.at(-2); //4
str.anchor("test"); // '<a name="test">12345</a>'
"12345".big(); //"<big>12345</big>"
"12345".blink(); //"<blink>12345</blink>"
"12345".bold(); //"<b>12345</b>"
"12345".fixed(); // <tt>12345</tt>
"12345".fontcolor("red"); // <font color="red">12345</font>
"12345".fontsize(20); // <font size="20">12345</font>
"12345".italics(); //<i>12345</i>
"12345".link("https://www.cjavapy.com"); // <a href="https://www.cjavapy.com">12345</a>
"12345".charAt(1); //2
"12345".charAt(5); //''
"12345".charAt(-1); //''
"12345".charCodeAt(1); //50
"12345".charCodeAt(5); //NaN
"12345".charCodeAt(-1); //NaN
"12345".codePointAt(1); //50
"12345".codePointAt(5); //NaN
"12345".codePointAt(-1); //NaN
"123".concat("456", "789", "10-11-12"); // '12345678910-11-12'
"123".concat([456, 789, undefined]); // "123456,789,";
"123".concat("456", "789", undefined); // '123456789undefined'
"123".concat({}, {}, { a: 1 }); // "123[object Object][object Object][object Object]";
"123".concat([4, 5, 6], [], { a: 1 }); // '1234,5,6[object Object]'
"123".constructor; // ƒ String() { [native code] }
"12345".endsWith(5); //true
"12345".endsWith(5, 0); //false
"12345".endsWith(1, 0); // false
"12345".includes(3); // true
"12345".includes(5, 0); // true
"12345".includes(1, 1); // false
"12345".includes(1, -1); // true
"12345".indexOf(4); //3
"12345".indexOf(6); //-1
"12345".indexOf(4, 4); // -1
"12345".indexOf(4, 3); //3
"12345".indexOf(4, -4); //3
"12345".length; //5
"a".localeCompare("b"); // -1
"ac".localeCompare("ab"); // 1
"abc".localeCompare("abc"); //0
"abc1234g".match(/[0-9]/); // ["1", groups: undefined, index: 3, input: "abc1234g"]
"abc1234g".match(/[0-9]/g); //['1', '2', '3', '4']
[..."example1example2".matchAll(/e(xam)(ple(\d?))/g)];
//[[0: "example1",1: "xam",2: "ple1",3: "1",groups: undefined,index: 0,input: "example1example2example3"]
//[0: "example2",1: "xam",2: "ple2",3: "2",groups: undefined,index: 8,input: "example1example2example3"]]

"\u1E9B\u0323".normalize("NFC"); // '\u1E9B\u0323'
"\u1E9B\u0323".normalize(); // same as above
"\u1E9B\u0323".normalize("NFD"); // '\u017F\u0323\u0307'
"\u1E9B\u0323".normalize("NFKC"); // '\u1E69'
"\u1E9B\u0323".normalize("NFKD"); // '\u0073\u0323\u0307'
"x".padEnd(10, "abc"); // 'xabcabcabc'
"x".padEnd(0, "a"); // 'x'
"x".padEnd(-2, "a"); // 'x'
"x".padStart(10, "abc"); // 'abcabcabcx'
"x".padStart(0, "a"); // 'x'
"x".padStart(-2, "a"); // 'x'
"12345".repeat(2); // '1234512345'
"12345".repeat(-1); // Uncaught RangeError: Invalid count value: -1
"12345".repeat(2.3); // '1234512345'
"12345".repeat(0); //''
"12345".repeat(); //''
"12345".repeat([]); //''
"12345".repeat({}); //''
"12345".repeat(null); //''
"12345".repeat(undefined); //''
