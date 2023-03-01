import {check} from '../stateMachine/kmp_state';
describe('test check', ()=>{
    test('check', ()=>{
        let res = check('abcde')
        expect(res).toBe(true);
        res = check('abefs')
        expect(res).toBe(false);
        res = check('adabc')
        expect(res).toBe(false);
        res = check('1234abcde888')
        expect(res).toBe(true);
        res = check('1234abc3de888')
        expect(res).toBe(false);
    })
})