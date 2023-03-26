const add = require('../add')

//测试单元，一组测试
describe('test add', ()=>{

    it('add(1,2)==3', ()=>{
        //断言
        expect(add(1,2)).toBe(3)
    })

    it('add(1,0)==1', ()=>{
        expect(add(1,0)).toBe(1)
    })

    it('add(2,2)==4',()=>{
        expect(add(2,2)).toBe(4)
    })

    it('add(12,12)==24',()=>{
        expect(add(12,12)).toBe(24)
    })

})