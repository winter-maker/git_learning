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
})