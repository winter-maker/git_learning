describe('双向数据绑定E2E测试demo', () => {
  // hook 每次单元测试前调用
  beforeEach(()=>{
    cy.visit('http://127.0.0.1:3000/')
  })

  it('初始状态', () => {
    //获取元素
    cy.get('input').should('have.value', 'Hello')
    cy.get('button').should('have.text', 'Hello')
  })
  
  it('按钮点击', ()=>{
    //模拟按钮点击
    cy.get('button').click();
    cy.get('input').should('have.value', 'olleH')
    cy.get('button').should('have.text', 'olleH')
  })

  it('Input 输入', ()=>{
    //模拟按钮点击
    cy.get('input').type(' Cypress');
    cy.get('input').should('have.value', 'Hello Cypress')
    cy.get('button').should('have.text', 'Hello Cypress')
  })
})