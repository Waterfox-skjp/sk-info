module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },
  pwa: {
    name: 'SK info',
    themeColor: '#E85298',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    iconPaths:{
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  }
}
