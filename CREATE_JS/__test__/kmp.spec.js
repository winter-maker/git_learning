import {writeNextKmp, generateNextKmp} from '../stateMachine/index.js';
describe('test find', ()=>{
    test('writeNextKmp', ()=>{
        let res = writeNextKmp('abababababd', 'abc');
        expect(res).toBe(-1);
        res = writeNextKmp('ababc', 'abc')
        expect(res).toBe(2)
        res = writeNextKmp('abdabdbaceabc', 'abc')
        expect(res).toBe(10)
    })
    test('generateNextKmp', ()=>{
        let res = generateNextKmp('abababc', 'abc');
        expect(res).toBe(4);
        res = generateNextKmp('abababc', 'ababc')
        expect(res).toBe(2)
    })
})
