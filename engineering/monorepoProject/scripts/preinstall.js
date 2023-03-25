if(!/pnpm/.test(process.env.npm_execpath || '')) {
    // 禁止使用除pnpm外的包管理器
    console.warn(`\u001b[33mThis repository requires using pnpm as the package manager`+
    ` for scripts to work properly.\u001b[39m\n`)
    process.exit(1)
}