// 主题配置
hexo.on('generateBefore', function () {
  var config = hexo.config;
  var theme = hexo.theme.config;

  /* 首页显示的文章数 */
  config.index_generator.per_page = theme.page_count;

  /* 本地搜索设置 */
  config.search = theme.search;

})