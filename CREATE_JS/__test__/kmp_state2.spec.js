import {check} from '../stateMachine/kmp_state2';
describe('test check', ()=>{
    test('check', ()=>{
        let res = check('abcde')
        expect(res).toBe(false);
        res = check('abcda')
        expect(res).toBe(false);
        res = check('fasgfw')
        expect(res).toBe(false);
        res = check('abababc')
        expect(res).toBe(true);

    })
})