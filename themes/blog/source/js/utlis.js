/**
 * 根据元素id获取dom
 * @param {String} id 元素id属性值
 * @returns {Document}
 */
function $id(id) {
    return document.getElementById(id)
}

/**
 * 根据元素属性获取dom
 * @param {String} ele 元素标识符
 * @returns {Document}
 */
function $query(ele) {
    return document.querySelector(ele)
}

/**
 * 根据元素属性获取dom
 * @param {String} eles 元素标识符
 * @returns {Array and Document}
 */
function $queryAll(eles) {
    return document.querySelectorAll(eles)
}

/**
 * 动态添加JavaScript
 * @param {*} url 资源地址
 * @param {*} callback 回调方法
 */
function getScript(url, callback) {
    let script = document.createElement('script')
    script.type = "text/javascript"
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            console.log(script.onreadystatechange)
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null
                    callback()
                }
            }
        } else {
            script.onload = function () {
                callback()
            }
        }
    }
    script.src = url
   $id("resource") != null ? $id("resource").appendChild(script) : document.body.appendChild(script)
}

/**
 * 图片懒加载
 * @param {*} img 需要懒加载的img元素(标签)
 * @param {*} attr 图片的真实url地址
 */
function ImgLazyLoad(img, attr) {
    $queryAll(img).forEach((target) => {
        const io = new IntersectionObserver((entries, Observer) => {
            entries.forEach((entry) => {
                setTimeout(function () {
                    if (entry.isIntersecting) {
                        const img = entry.target
                        const src = img.getAttribute(attr)
                        img.setAttribute('src', src)
                        Observer.disconnect()
                    }
                }, 500)
            })
        })
        io.observe(target)
    })
}
ImgLazyLoad('body img[data-img]', 'data-img')
