const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const dom = new JSDOM(
    '<!DOCTYPE html><head/><body></body>', // 初始化的标签
    //浏览器现有的参数
    {
        url: 'http://localhost/',
        referrer: 'https://example.com/',
        contentType: 'text/html',
        userAgent: 'Mellblomenator/9000',
        includeNodeLocations: true,
        storageQuota: 10000000
    }
)
// nodejs 全局是global
global.window = dom.window;
global.document = window.document;
global.navigator = window.navigator;