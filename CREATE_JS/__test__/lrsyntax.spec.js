import {isValid} from '../lexicalAnalysis/lrsyntax.js'
describe('test kuohao', ()=> {
    it('isvalid', ()=> {
        expect(isValid(['{','}','[',']','(',')','{','[',']','}'])).toBe(true);
    })
    it('isvalid2', ()=> {
        expect(isValid(['(',')',']','{','[',']','}'])).toBe(false);
    })
    it('isValid3', ()=>{
        expect(isValid(['[','(',']',')','{','}','(',')'])).toBe(true)
    })
})