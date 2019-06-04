import { parseType } from '../common/types'
import { parseJS, separateVar } from './proptool'

var beautify_js = require('js-beautify');

export function getCode(data) {
    if (!data) return '';
    const { byIndex, byId } = data
    
    return beautify_js(`(rss, updates, choice)=>{${byIndex.map(lK => parseLogic(byId, lK)).join(";")}}`, {brace_style: 'end-expand'})
}

//lK logicKey
function parseLogic(byLK, lK) {
    if (!lK) return ""

    const item = byLK[lK]
    if (!item) return ""

    const {
        byId: varRepo,
        byIndex,
        source,
    } = item
    
    let codeBody = parseVar(varRepo, source);
    let codeRight = byIndex ? "{" + byIndex.map(lK => parseLogic(byLK, lK)).join(";") + "}" : ""

    return codeBody + codeRight
}

//vK varKey
function parseVar(byVK, vK) {
    if (!vK) return ""

    const item = byVK[vK]
    if (!item) return ""

    const {
        parseBy,
        display,
        value,
    } = item

    switch(parseBy) {
        case parseType.operation:
            return parseVar(byVK, value.left) + display + parseVar(byVK, value.right)
        case parseType.number:
            return parseNumber(value)
        case parseType.variable:
            return parseJS(value)
        case parseType.wrapper:
            return value.left + parseVar(byVK, value.middle) + value.right
        case parseType.collection:
            return value ? value.map(cK => parseVar(byVK, cK)).join(";") : ""
        case parseType.object:
            return value ? '{' + value.map(cK => parseVar(byVK, cK)).join(",") + '}' : "{}"
        case parseType.string:
            return parseString(value)
        case parseType.update:
            return parseUpdate(value)
        case parseType.constant:
        case parseType.boolean:
            return value
        default:
            return '';
    }
}

export function parseNumber(repo, key) {
    if (!repo) return ""

    const item = repo[key]
    if (!item) return ""
    
    switch(item.parseBy) {
        case parseType.operation:
            return `(${parseNumber(repo, item.value.left)} ${item.display} ${parseNumber(repo, item.value.right)})`
        case parseType.variable:
            return parseJS(item.value)
        default:
            return ''
    }
}

export function parseUpdate(value) {
    const parts = separateVar(value)

    return 'updates[\'' + parts.slice(1).join("/") + '\']'
}

export function parseString({byId, byIndex}) {
    if (!byIndex) return ""

    const parts = byIndex.map(sK => {
        switch(byId[sK].parseBy) {
            case parseType.variable:
                return `\${${parseJS(byId[sK].value)}}`
            case parseType.constant:
                return byId[sK].value
            default:
                return ""
        }
    })

    return '`' + parts.join(" ") + '`'
}