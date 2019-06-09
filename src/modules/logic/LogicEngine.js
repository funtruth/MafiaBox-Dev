import _ from 'lodash'
import { parseType, comparisonType, variableType } from '../common/types'
import { parseJS, separateVar, START_CHAR, varInStr, keyAsStr } from './proptool'
import { VARTYPE_FILTER } from '../common/arrows';

export function getCode(data) {
    if (!data) return '';
    const { byIndex, byId, vars } = data
    
    return `(rss, next, choice)=>{${byIndex ? byIndex.map(lK => parseLogic(byId, lK, vars)).filter(i => i).join(";"):''}}`
}

//lK logicKey
function parseLogic(byLK, lK, vars) {
    if (!lK) return ""

    const item = byLK[lK]
    if (!item) return ""

    const {
        byId: varRepo,
        byIndex,
        source,
    } = item
    
    let codeDeclare = _.filter(vars, i => i.scope === lK).map(v => 'let ' + parseJS(v.value)).join(';')
    if (codeDeclare) codeDeclare += ';'
    let codeBody = parseVar(varRepo, source);
    let codeRight = byIndex ? "{" + byIndex.map(lK => parseLogic(byLK, lK, vars)).join(";") + "}" : ""

    return codeDeclare + codeBody + codeRight
}

//vK varKey
function parseVar(byVK, vK) {
    if (!vK) return ""

    const item = byVK[vK]
    if (!item) return ""

    const {
        parseBy,
        value,
    } = item

    switch(parseBy) {
        case parseType.operation:
            return parseVar(byVK, value.left) + comparisonType[value.operator].code + parseVar(byVK, value.right)
        case parseType.number:
            return parseNumber(value.byId, value.source)
        case parseType.variable:
        case parseType.declare:
            return parseJS(value)
        case parseType.wrapper:
            return value.left + parseVar(byVK, value.middle) + value.right
        case parseType.collection:
            return value ? value.map(cK => parseVar(byVK, cK)).join(";") : ""
        case parseType.object:
            return value ? '{' + value.map(cK => parseVar(byVK, cK)).join(";") + '}' : "{}"
        case parseType.string:
            return parseString(value)
        case parseType.update:
            return parseUpdate(value)
        case parseType.constant:
        case parseType.boolean:
            if (VARTYPE_FILTER([variableType.key.key, variableType.global.key])(item)) return keyAsStr(value)
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
        case parseType.constant:
            return item.value
        default:
            return ''
    }
}

export function parseUpdate(value) {
    const parts = separateVar(value).slice(1)
    
    for (var i=0; i<parts.length; i++) {
        if (parts[i].charAt(0) === START_CHAR) {
            parts[i] = varInStr(parts[i])
        }
    }

    return 'next.update[`' + parts.join("/") + '`]'
}

export function parseString({byId, byIndex}) {
    if (!byIndex) return ""

    const parts = byIndex.map(sK => {
        switch(byId[sK].parseBy) {
            case parseType.variable:
                return varInStr(byId[sK].value)
            case parseType.constant:
                return byId[sK].value
            default:
                return ""
        }
    })

    return '`' + parts.join(" ") + '`'
}