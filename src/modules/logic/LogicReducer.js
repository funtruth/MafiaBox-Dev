import _ from 'lodash'
import { logicType, comparisonType, returnType, updateType, updateViewType } from './types'
import { stringToCode } from '../strings/stringTool';

var beautify_js = require('js-beautify');

const initialState = {}

export function getParents(value) {
    let children = {}

    //gather all keys that are children
    for (var logicKey in value) {
        if (value[logicKey].right) children[value[logicKey].right] = true
        if (value[logicKey].down) children[value[logicKey].down] = true
    }
    
    //gather all keys that are parents, set index to the first parent
    //TODO show variables in chronological order for dropdown PickVar
    return _.pickBy(value, (i, key) => !children[key])
}

export function getCode(fieldInfo, key, library) {
    const { vars } = fieldInfo
    return (dispatch, getState) => {
        return `(${groupRSSVars(vars)}${beautify_js(`)=>{${recursive(key, library)}}`, {brace_style: 'end-expand'})}`
    }
}

function recursive(key, library) {
    if (!key || !library[key] || !library[key].logicType) return
    const type = library[key].logicType
    const data = library[key].data

    let codeCurrent = ''
    switch(type) {
        case logicType.if.key:
            codeCurrent = data
            break
        case logicType.elseif.key:
            codeCurrent = data
            break
        case logicType.operator.key:
            codeCurrent = convertPropertyFields(`${data.var1||''}${data['var1.adjust']||''}${(data.comparison && comparisonType[data.comparison].code)||''}${data.var2||''}${data['var2.adjust']||''}`)
            break
        case logicType.return.key:
            codeCurrent = returnText(data)
            break
        case logicType.update.key:
            codeCurrent = codeCurrent.concat(getUpdateCode(data))
            break
        case logicType.else.key:
        case logicType.function.key:
        default:
    }
    if (!codeCurrent) codeCurrent = ''

    let codeBody = ''
    let codeRight = recursive(library[key].right, library) || '\n'
    switch(type) {
        case logicType.if.key:
            codeBody = `if(${codeCurrent}){${codeRight}}`
            break
        case logicType.else.key:
            codeBody = `else{${codeRight}}`
            break
        case logicType.elseif.key:
            codeBody = `else if(${codeCurrent}){${codeRight}}`
            break
        case logicType.operator.key:
            codeBody = `if(${codeCurrent}){${codeRight}}`
            break
        case logicType.function.key:
            codeBody = `${codeCurrent};${codeRight};`
            break
        case logicType.return.key:
            codeBody = `return ${codeCurrent};`
            break
        case logicType.update.key:
            codeBody = `${codeCurrent}${codeRight}`
            break
        default:
            codeBody = ''
    }
    
    let codeDown = library[key].down ? recursive(library[key].down, library) : ''

    return `${codeBody}${codeDown}`
}

//replace variable properties from foo.$bar to foo[bar]
export function convertPropertyFields(string) {
    let parts = string.split('.')

    for (var i=0; i<parts.length; i++) {
        if (parts[i].charAt(0) === '$') {
            parts[i] = `${parts[i]}]`
        }
    }

    parts = parts.join('.').replace(/\$/g, '[').replace(/\.\[/g, '[')

    return parts
}

//converts the variables in event text properly
function eventText(object) {
    const eventKeys = ['string', 'showTo', 'hideFrom']
    return eventKeys.map(k => k in object ?
        `${k}:${typeof object[k] === 'string' ?
            `\`${stringToCode(object[k])}\``
            :`{${Object.keys(object[k]).map(u => `${convertPropertyFields(u)}:true,`)}}`
        },`:'').join('')
}

//get return text
function returnText(data) {
    const { key } = data
    switch(key) {
        case 'toast':
            return `{${eventText(data)}}`
        default:
            return returnType[key] ? returnType[key].code : ''
    }
}

//handles data value formatting on the right side of the =
function convertValue(data, field) {
    switch(typeof data[field].value) {
        case 'string':
            return updateType[data[field].value] ?
                updateType[data[field].value].code(data, convertPropertyFields(field))
                :`'${data[field].value}'`
        case 'object':
        default:
            console.log('logic reducer warning for future Michael', {
                value: data[field].value,
                type: typeof data[field].value,
            })
            return `${data[field].value}`
    }
}

//uses data and returns the combined string
export function getUpdateCode(data) {
    let string = ''
    for (var field in data) {
        if (!data[field].value) continue

        if (data[field].update) {
            string = string.concat(
                `updates[\`${field.split('.').map(i => i.charAt(0) === '$' ? `\${${i.substring(1)}}` : i)
                .join('/')}\`]=${convertValue(data, field)};`
            )
        }
        
        if (data[field].mutate) {
            string = string.concat(
                `${convertPropertyFields(field)}=${convertValue(data, field)};`
            )
        }

        switch(data[field].updateViewType) {
            case updateViewType.trigger:
                string = string.concat(`${convertPropertyFields(field)}=(visitor)=>{${getUpdateCode(data[field].value)}}`)
                break
            case updateViewType.events:
                Object.keys(data[field].value).forEach(stringKey => {
                    string = string.concat(`updates[\`events/\${timestamp++}\`]={${eventText(data[field].value[stringKey])}};`)
                })
                break
            case updateViewType.timer:
                string = string.concat(
                    `updates[\`${field.split('.').map(i => i.charAt(0) === '$' ? `\${${i.substring(1)}}` : i)
                    .join('/')}\`]=Date.now() + ${data[field].value};`
                )
                break
            default:
        }
    }
    return string
}

//group variables for the function arguments
function groupRSSVars(vars) {
    let yes = [], no = []
    Object.keys(vars).forEach(key => {
        if (key.charAt(0) === '$') {
            vars[key].rss ? yes.push(key.substr(1)) : no.push(key.substr(1))
        } else {
            vars[key].rss ? yes.push(key) : no.push(key)
        }
    })

    const rssVars = `{${yes.join(', ')}}`
    const otherVars = (no.length ? `, {${no.join(', ')}}` : '')
    return `${rssVars}${otherVars}`
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}