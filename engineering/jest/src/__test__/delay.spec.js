const delay = require('../delay');


describe('异步测试', ()=>{
    
    it('fn', done=>{
        //间谍函数，
        const mockFn = jest.fn();

        //模拟时间函数，让时间函数的速度进行快进的处理
        jest.useFakeTimers()
        delay(()=>{
            mockFn(1)
            mockFn(2)
            done()
        })
        jest.runAllTimers()
        expect(true).toBe(true)
        expect(mockFn).toBeCalled();
        expect(mockFn).toBeCalledTimes(2);
        expect(mockFn).toHaveBeenCalledWith(1)
    })
})