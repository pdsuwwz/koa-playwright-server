module.exports = {
  getPresetsEnv (isModule = true) {
    return [
      '@babel/preset-env', {
        targets: {
          node: '16'
        },
        // https://github.com/babel/babel/issues/10374#issuecomment-597029696
        modules: isModule ? 'auto' : false
      }
    ]
  }
}
