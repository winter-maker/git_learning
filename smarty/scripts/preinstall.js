//禁用 npm
// pnpm 的monorepo 项目在node_modules 以及开发中，项目依赖 pnpm workspace 使用npm 或 yran 运行时会出现问题。
if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.warn(
    `\u001b[33mThis repository requires using pnpm as the package manager for scripts to work properly.\u001b[39m\n`
  );
  process.exit(1);
}
