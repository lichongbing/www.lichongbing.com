try {
    var localSearch = $id('local_search')
    var html = $query('html')
    var mask = $id('mask')
    var searchBtn = $query('.search_btn')
    var searchClose = $query('.search_close_button')
    var isLoad = false // 资源是否被加载
    var searchId = 'local_search_input'
    var contentId = 'local_search_result'

    /**
     * 本地搜索
     * 来源于hexo-butterfly
     * 由Lete乐特进行小型改动
     * @param {*} path 文件路径
     */
    async function search(path) {
        isLoad = true
        const suffix = path.split('.')[1]
        let datas = []
        const response = await fetch(path)

        if (suffix == 'json') datas = await response.json()
        if (suffix == 'xml') {
            const result = await response.text()
            const DOM = new window.DOMParser()
            const data = DOM.parseFromString(result, 'text/xml')
            datas = [...data.querySelectorAll('entry')].map((item) => {
                return {
                    title: item.querySelector('title').textContent,
                    content: item.querySelector('content').textContent,
                    url: item.querySelector('url').textContent
                }
            })
        }

        var $input = $id(searchId)
        var $resultContent = $id(contentId)
        $input.addEventListener('input',function ()  {
            var str = '<ul class="search_result_list">'
            var keywords = this.value
                .trim()
                .toLowerCase()
                .split(/[\s\-]+/)
            $resultContent.innerHTML = ''
            if (this.value.trim().length <= 0) return
            // perform local searching
            datas.forEach((data) => {
                var isMatch = true
                if (!data.title || data.title.trim() === '') data.title = 'Untitled'
                var dataTitle = data.title.trim().toLowerCase()
                var dataContent = data.content
                    .trim()
                    .replace(/<[^>]+>/g, '')
                    .toLowerCase()
                var dataUrl = data.url.startsWith('/') ? data.url : '/' + data.url
                var indexTitle = -1
                var indexContent = -1
                var firstOccur = -1
                // only match artiles with not empty contents
                if (dataContent !== '') {
                    keywords.forEach(function (keyword, i) {
                        indexTitle = dataTitle.indexOf(keyword)
                        indexContent = dataContent.indexOf(keyword)

                        if (indexTitle < 0 && indexContent < 0) isMatch = false
                        else {
                            if (indexContent < 0) indexContent = 0
                            if (i == 0) firstOccur = indexContent
                        }
                    })
                } else isMatch = false
                // show search results
                if (isMatch) {
                    var content = data.content.trim().replace(/<[^>]+>/g, '')
                    if (firstOccur >= 0) {
                        // cut out 100 characters
                        var start = firstOccur - 20
                        var end = firstOccur + 80
                        if (start < 0) start = 0
                        if (start == 0) end = 100
                        if (end > content.length) end = content.length
                        var matchContent = content.substring(start, end)

                        // highlight all keywords
                        keywords.forEach((keyword) => {
                            var regS = new RegExp(keyword, 'gi')
                            matchContent = matchContent.replace(regS, '<span class="search_keyword">' + keyword + '</span>')
                            dataTitle = dataTitle.replace(regS, '<span class="search_keyword">' + keyword + '</span>')
                        })
                        str += "<li><a href='" + dataUrl + "' class='search_result_title'>" + dataTitle + '</a>'
                        str += '<p class="search_result">' + matchContent + '...</p>'
                    }
                    str += '</li>'
                }
            })
            str += '</ul>'
            $resultContent.innerHTML = str
            window.pjax && window.pjax.refresh($resultContent)
        })
    }

    // 显示搜索框
    searchBtn.onclick = function () {
        if (!isLoad) search($config.searchFile)
        mask.className = 'mask'
        if (!localSearch.style.display) {
            localSearch.style.display = 'block'
            html.style.overflow = 'hidden'
            localSearch.classList.remove('search_animation_min')
            localSearch.classList.add('search_animation_max')
            $id(searchId).focus()
        }
    }

    // 关闭搜索框
    searchClose.onclick = function () {
        localSearch.classList.remove('search_animation_max')
        localSearch.classList.add('search_animation_min')
        mask.classList.remove('mask')
        html.style.overflow = 'auto'
        setTimeout(() => (localSearch.style.display = ''), 500)
    }

    window.addEventListener('pjax:complete', () => {
        localSearch.style.display === 'none' ? (mask.className = '') : ''
    })
} catch (e) {
    console.log('search error: ', e)
}