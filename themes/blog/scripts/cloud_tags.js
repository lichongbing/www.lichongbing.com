/**
 * cloudTags.js
 * transplant from hexo-theme-butterfly
 */

'use strict'

hexo.extend.helper.register('cloud_tags', function (options = {}) {
    const env = this
    let source = options.source
    const minfontsize = options.minfontsize
    const maxfontsize = options.maxfontsize
    const limit = options.limit
    const unit = options.unit || 'px'

    let result = ''
    if (limit > 0) {
        source = source.limit(limit)
    }

    const sizes = []
    source.sort('length').forEach(tag => {
        const {length} = tag
        if (sizes.includes(length)) return
        sizes.push(length)
    })

    const length = sizes.length - 1
    source.forEach(tag => {
        const ratio = length ? sizes.indexOf(tag.length) / length : 0
        const size = minfontsize + ((maxfontsize - minfontsize) * ratio)
        let style = `font-size: 1em;`
        if (tag.name.size >= 6) {
            style = `font-size: 0.8em;`
        }
        let colorArr = ['#F9EBEA', '#F5EEF8', '#D5F5E3', '#E8F8F5', '#FEF9E7',
            '#F8F9F9', '#82E0AA', '#D7BDE2', '#A3E4D7', '#85C1E9', '#F8C471', '#F9E79F', '#FFF'];

        const color = colorArr[Math.floor(Math.random() * 13)]
        style += ` background-color: ${color}`
        result += `<a href="${env.url_for(tag.path)}" style="${style}" class="tag_ship">🔖 ${tag.name}<span class="tag-length">${tag.length}</span></a>`
    })
    return result
})