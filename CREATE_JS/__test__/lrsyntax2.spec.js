import { getClosure, getClosureStates, expressionPrimary } from '../lexicalAnalysis/lrsyntax2.js';
describe('Test getClosure', ()=> {
    test('expression', ()=> {
        const res = getClosure('Expression')
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
    // test('getClosureStates', ()=>{
    //     const initStates = {
    //         AdditiExp: { $reduce: 'Expression'}
    //     }
    //     expect(JSON.stringify(getClosureStates(initStates))).toBe(
    //         [
    //             ['AdditiExp'],
    //             ['MultiExp'],
    //             ['AdditiExp', '+', 'MultiExp'],
    //             ['AdditiExp','-', 'MultiExp'],
    //             ['Primary'],
    //             ['MultiExp','*', 'MultiExp'],
    //             ['MultiExp', '/', 'MultiExp'],
    //             ['Number'],
    //             ['(', 'Expression', ')']
    //         ]
    //     )
    // })
    test('expressionPrimary', ()=>{
        expect(expressionPrimary('(1+(2*3))')).toBe(false)
    })
    /***
     * 设计一个单侧可以检测循环对象的结构是否相等。
     * 1、变成key的字符串
     * 2、属性指向边，检测两张有向图是否同构，是否具有相同的点和边
     */
})