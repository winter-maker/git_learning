const {generateDiv} = require('../dom')
require('../../jsdom-config')
it('dom的快照测试', ()=> {
    generateDiv();

    //toMatchSnapshot 和上次的快照进行一次比对
    expect(document.getElementsByClassName('c1')).toMatchSnapshot()
})