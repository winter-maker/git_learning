import {check} from '../stateMachine/generate_kmp_state2.js';
describe('test check', ()=> {
    test('check', ()=>{
        let res = check('ababbabababc', 'abababc')
        expect(res).toBe(5);
        res = check('ceessababab', 'ababa')
        expect(res).toBe(5)
        res = check('abababc', 'abababc')
        expect(res).toBe(0)
        res = check('ab12345', 'abc')
        expect(res).toBe(-1)
        res = check('abababc', 'ababa')
        expect(res).toBe(0)
    })
})