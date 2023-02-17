// 只允许使用pnpm
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn('\u001B[33m请使用pnpm.\u001B[39m\n')
  process.exit(1)
}
