/**
 * 认识编译原理的基础概念
 */
//  const str = "Hello, world!";
//  const regex = /o/;
//  const result = regex.exec(str);
//  console.log(result); 

const str = "Today is September 17th, 2022.";
const regex = /\d+/g;
let result;
while ((result = regex.exec(str))) {
  console.log(result);
}
