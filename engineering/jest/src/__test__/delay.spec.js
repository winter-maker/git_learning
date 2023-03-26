const delay = require('../delay');


describe('异步测试', ()=>{
    
    it('fn', done=>{
        //模拟时间函数，让时间函数的速度进行快进的处理
        jest.useFakeTimers()
        delay(()=>{
            done()
        })
        jest.runAllTimers()
        expect(true).toBe(true)
    })
})