import { genClosure } from '../lexicalAnalysis/lrsyntax2.js';
describe('Test genClosure', ()=> {
    test('expression', ()=> {
        const res = genClosure('Expression')
        expect(JSON.stringify(res)).toBe(JSON.stringify([
            ['AdditiExp'],
            ['MultiExp'],
            ['AdditiExp', '+', 'MultiExp'],
            ['AdditiExp','-', 'MultiExp'],
            ['Primary'],
            ['MultiExp','*', 'MultiExp'],
            ['MultiExp', '/', 'MultiExp'],
            ['Number'],
            ['(', 'Expression', ')']
        ]))
    })
    /***
     * 设计一个单侧可以检测循环对象的结构是否相等。
     * 1、变成key的字符串
     * 2、属性指向边，检测两张有向图是否同构，是否具有相同的点和边
     */
})