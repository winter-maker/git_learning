exports.generateDiv = ()=> {
    //浏览器环境运行没问题，nodejs 环境要做仿真 jsdom
    const div = document.createElement('div');
    div.className = 'c1';
    document.body.appendChild(div)
}