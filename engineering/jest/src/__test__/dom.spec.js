const {generateDiv} = require('../dom')
require('../../jsdom-config')
it('dom test', ()=>{
    generateDiv()

    expect(document.getElementsByClassName('c1').length).toBe(1);

})