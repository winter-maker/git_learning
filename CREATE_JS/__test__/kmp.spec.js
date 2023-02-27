import {find3, handKmp, generateNextKmp, strStr} from '../stateMachine/kmp.js';
describe('test find', ()=>{
    test('find3', ()=>{
        let res = find3('abababababd', 'abc');
        expect(res).toBe(-1);
        res = find3('ababc', 'abc')
        expect(res).toBe(2)
        res = find3('abdabdbaceabc', 'abc')
        expect(res).toBe(10)
    })
    test('handKmp', ()=>{
        let res = find3('abababc', 'ababc');
        expect(res).toBe(-1);
        res = handKmp('abababc', 'ababc');
        expect(res).toBe(2);
    })
    test('strStr', ()=>{
        let res = strStr('aabaabaaf', 'aba');
        expect(res).toBe(1);
        res = strStr('aabaabaaf', 'aabaaf')
        expect(res).toBe(3)
    })
})
