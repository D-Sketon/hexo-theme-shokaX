'use strict'
/* global hexo */
const themeConfig = hexo.theme.config
const plugins = []
const insertions = new Map()
const tools = {
  insert: function (type, text) {
    // TODO 插入模板
    insertions.get(type).push(text)
  }
}

// 加载插件
if (themeConfig?.plugins) {
  hexo.log.info('Found shokaX plugins to load')
  themeConfig.plugins.forEach((item) => {
    hexo.log.info(`Loading ${item}`)
    const p = require(item)
    if (!p) {
      hexo.log.error(`${item} load failed,because can't import the package`)
    } else {
      plugins.push(p)
    }
  })
  plugins.forEach((item) => {
    if (item?.main) {
      const res = item.main(hexo, this, tools)
      hexo.log.info(`${item} loaded,result: ${res}`)
    } else {
      hexo.log.error(`${item} load failed,because the plugin don't have a function to enter`)
    }
  })
} else {
  hexo.log.info('No shokaX plugins to load')
}

hexo.extend.helper.register('insert_footer', () => {
  let res
  insertionsFooter.forEach((item) => {
    res += item
  })
  return res
})