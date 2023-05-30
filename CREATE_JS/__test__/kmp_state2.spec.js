import {check} from '../stateMachine/kmp_state2';
describe('test check', ()=>{
    test('check', ()=>{
        let res = check('abcde','abababc')
        expect(res).toBe(-1);
        res = check('abcda','abababc')
        expect(res).toBe(-1);
        res = check('fasgfw','abababc')
        expect(res).toBe(-1);
        res = check('abababc', 'abababc')
        expect(res).toBe(0);
        res = check('abababc5555', 'abababc')
        expect(res).toBe(0);
        res = check('abaaaabababcerggg', 'abababc')
        expect(res).toBe(5);
        res = check('ababababcaaaabababcerggg', 'abababc')
        expect(res).toBe(2);
    })
})