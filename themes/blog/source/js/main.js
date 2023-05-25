var html = $query("html")
var mask = $id("mask")

// 打开手机端导航栏
function open_mobile() {
    let open_nav = $query('.open_nav')
    if (!open_nav) return
    let mobile_nav = $id("mobile_nav")
    open_nav.onclick = function () {
        let is_open = mobile_nav.classList.contains("open_mobile")
        if (!is_open) {
            mobile_nav.className = "open_mobile"
            mask.className = "mask"
        }
    }
}

// 关闭所有正在打开的弹窗(搜索框、侧边栏)
function close_all() {
    // 搜索框缩放样式
    let local_search = $id("local_search")
    if (local_search) {
        local_search.classList.remove("search_animation_max")
        local_search.classList.add("search_animation_min")
        setTimeout(function () {// 延迟0.5秒隐藏
            local_search.style.display = ""
        }, 500)
    }
    html.style.overflow = "auto"// 解除滚动条禁止滚动
    // 目录
    let toc = $query(".open_toc")
    if (toc) toc.classList.remove("open_toc")
    // 更多信息
    let about = $query(".open_about")
    if (about) about.classList.remove("open_about")
    // 侧边栏
    mobile_nav.classList.remove("open_mobile")
    mobile_nav.style.opacity = ""
    mask.className = "" // 关闭遮罩
}

// 深色模式
function DarkMode() {
    if (!$id('darkmode')) return
    let darkIco = $query('#darkmode i')
    if (localStorage.isDark === 'true') {
        html.setAttribute('theme', 'dark')
        darkIco.classList.remove('fa-moon')
        darkIco.classList.add('fa-sun')
    } else {
        localStorage.isDark = 'false'
        html.removeAttribute('theme')
        darkIco.classList.remove('fa-sun')
        darkIco.classList.add('fa-moon')
    }
    $id('darkmode').onclick = function () {
        let body_wrap = $id("body_wrap")
        if (localStorage.isDark !== 'true') {
            localStorage.isDark = 'true'
            body_wrap.style.transition = 'all .3s linear'
            html.setAttribute('theme', 'dark')
            darkIco.classList.remove('fa-moon')
            darkIco.classList.add('fa-sun')
        } else {
            localStorage.isDark = 'false'
            body_wrap.style.transition = 'all .3s linear'
            html.removeAttribute('theme')
            darkIco.classList.remove('fa-sun')
            darkIco.classList.add('fa-moon')
        }
    }
}

// 滚动事件
function scroll() {
    // 监听 scroll
    let windowTop = 0 // 定义初始位置
    window.addEventListener('scroll', function () {
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //窗口高度
        let pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight // 页面总高度
        let scrollTop = window.scrollY || document.documentElement.scrollTop //当前位置

        // progress侧边进度条
        let scroll_height = scrollTop / (pageHeight - winHeight) * 100
        let scrollbar_current = $query(".j-scrollbar-current")
        if (scrollbar_current) {
            scrollbar_current.style.height = scroll_height + '%'
        }

        // 回到顶部
        let backTop = $id("backTop")
        scrollTop > 20 ? backTop.style.visibility = "unset" : backTop.style.visibility = "hidden"

        //progress bar底部进度条
        let progressElement = $query('.progress-bar')
        let scrollAvail = pageHeight - winHeight // 可滚动的高度
        if (progressElement && scrollAvail) {
            progressElement.style.width = (scrollTop / scrollAvail) * 100 + '%'
        }

        // toc目录百分比
        let article = $query(".post_content")
        let num = $query(".num")
        if (article && num) {
            let headerHeight = article.offsetTop
            let docHeight = article.clientHeight

            let contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : (document.documentElement.scrollHeight - winHeight)
            let scrollPercent = (scrollTop - headerHeight) / (contentMath)
            let scrollPercentRounded = Math.round(scrollPercent * 100)
            let percentage = (scrollPercentRounded > 100) ? 100 : (scrollPercentRounded <= 0) ? 0 : scrollPercentRounded

            num.innerText = percentage + "%"
            $query(".progress").value = percentage
        }
    })
}

//文章页面执行JS
function articlePage() {
    if (!$id('post')) return;
    // 打开目录
    ;(function () {
        let open_toc = $id("open_toc")
        let toc = $id("toc")
        if (!toc) return
        open_toc.onclick = function () {
            let is_open = toc.classList.contains("open_toc")
            if (!is_open) {
                toc.classList.add("open_toc")
                let toc_text = $queryAll(".toc-link")
                for (let i in toc_text) {
                    toc_text[i].onclick = function () {
                        toc.classList.remove("open_toc")
                    }
                }
            } else toc.classList.remove("open_toc")
        }
    })()
    // 代码框
    ;(function () {
        let code_block = $queryAll("figure.highlight")
        code_block.forEach(function (item) {
            let lang = item.classList[1]
            lang = lang === 'plaintext' ? 'code' : lang
            let ele = `<div class="code_block" lang="${lang}">
            <span class="clipboard"><i class="fa fa-clipboard"></i></span>
        </div>`
            item.insertAdjacentHTML('afterbegin', ele)
        })
    })()
    // fancybox
    ;(function () {
        getScript($config.CDN.fancybox_js, function () {
            Fancybox.bind('[data-img]')
            let link = document.createElement('link')
            link.rel = 'stylesheet'
            link.type = 'text/css'
            link.href = $config.CDN.fancybox_css
            document.head.appendChild(link)
        })
    })()
    // 代码块折叠
    ;(function () {
        if (!$config.code_block_expand || !$config.code_block_expand.enable) return
        let CodeBlock = $queryAll("figure.highlight")
        // 定义高度
        let height = $config.code_block_expand.height
        // 获取当前页面的所有的代码块 循环判断符合条件的折叠
        for (let i = 0; i < CodeBlock.length; i++) {
            if (CodeBlock[i].clientHeight > height) {
                CodeBlock[i].style = "max-height: " + height + "px"
                /**
                 * 插入html元素
                 * beforeBegin：插入到标签开始前
                 * afterBegin:插入到标签开始标记之后
                 * beforeEnd:插入到标签结束标记前
                 * afterEnd:插入到标签结束标记后
                 */
                CodeBlock[i].insertAdjacentHTML("beforeend", '<div class="show-btn"><i class="fas fa-angle-down"></i></div>')
            }
        }
        // 展开
        $queryAll(".show-btn").forEach(function (item) {
            item.onclick = function () {
                let child = item.childNodes[0] // 获取子节点
                if (child.className === "fas fa-angle-down") {
                    child.classList.remove("fa-angle-down")
                    child.classList.add("fa-angle-up")
                    item.parentNode.style = "" //清除父节点的样式
                } else {
                    child.classList.remove("fa-angle-up")
                    child.classList.add("fa-angle-down")
                    item.parentNode.style = "max-height: " + height + "px"
                    item.previousElementSibling.style = ""
                    // 获取当前页面滚动条纵坐标的位置
                    scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                    let node_bottom = item.getBoundingClientRect().bottom // 获取当前元素底部距离可见部分的距离
                    let CodeBlockBottom = node_bottom + scrollTop, // 当前代码块底部距离顶部距离
                        CodeBlockHeight = $config.code_block_expand.height,// 获取代码块超过多少数值折叠代码块
                        CodeBlockScrollTop = $config.code_block_expand.scrollTop // 获取代码块关闭折叠后滚动返回代码块顶部的距离
                    window.scrollTo(0, CodeBlockBottom - CodeBlockHeight - CodeBlockScrollTop)
                }
            }
        })
    })()
    // 代码块复制
    ;(function () {
        $queryAll("figure.highlight").forEach(function (item) { // 获取所有代码块
            // firstChild: 获取代码块中的第一个子元素
            // childNodes: 返回当前元素的所有子元素(包括:before和:after)
            let clipboard = item.firstChild.childNodes[1]
            clipboard.onclick = function () {
                let selection = window.getSelection()
                selection.selectAllChildren(item.querySelector(".code"))
                document.execCommand("copy")
                selection.removeAllRanges()
                clipboard.innerHTML = "<i class='fa fa-check' style='color:green'></i>"
                setTimeout(function () {
                    clipboard.innerHTML = "<i class='fa fa-clipboard'></i>"
                }, 2000)
            }
        })
    })()
}

// 执行所有函数
function exeAllFn() {
    open_mobile() // 打开手机端导航栏
    close_all() // 关闭所有弹窗
    DarkMode() // 深色模式
    scroll() // 滚动事件
    articlePage() // 文章页面执行JS
}

document.addEventListener('DOMContentLoaded', exeAllFn)
