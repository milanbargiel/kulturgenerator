module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Kulturgenerator | Online-Galerie'
      return args
    })
  }
}
