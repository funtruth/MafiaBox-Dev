import { logicType, returnType, updateType, updateViewType, operatorType, panelType } from './types'
import { stringToCode } from '../strings/stringTool';

var beautify_js = require('js-beautify');

const initialState = {}

//THUNK FUNCTIONS
export function getCode(fieldInfo, key, library) {
    const { vars } = fieldInfo
    return (dispatch, getState) => {
        return `(${groupRSSVars(vars)}${beautify_js(`)=>{${recursive(key, library)}}`, {brace_style: 'end-expand'})}`
    }
}

//used for LogicPanel to get proper title
export function dataPropToTitle(obj) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        switch(obj.type) {
            case panelType.page.key:
                return pageRepo[obj.value] && pageRepo[obj.value].title
            case panelType.var.key:
                return applyAdjust(obj)
            default:
        }
    }
}

function recursive(key, library) {
    if (!key || !library[key] || !library[key].logicType) return

    const type = library[key].logicType
    const opType = library[key].operatorType
    const data = library[key].data

    let codeCurrent = ''
    switch(type) {
        case logicType.operator.key:
            codeCurrent = convertPropertyFields(`${getCodeFromDataProp(data.var1)}${(data.comparison && data.comparison.code)||''}${getCodeFromDataProp(data.var2)}`)
            break
        case logicType.return.key:
            codeCurrent = returnText(data)
            break
        case logicType.update.key:
            codeCurrent = codeCurrent.concat(getUpdateCode(data))
            break
        case logicType.function.key:
        default:
    }

    if (!codeCurrent) codeCurrent = ''

    let codeBody = ''
    let codeRight = recursive(library[key].right, library) || '\n'
    switch(type) {
        case logicType.operator.key:
            switch(opType) {
                case operatorType.if.key:
                    codeBody = `if(${codeCurrent}){${codeRight}}`
                    break
                case operatorType.else.key:
                    codeBody = `else{${codeRight}}`
                    break
                case operatorType.elseif.key:
                    codeBody = `else if(${codeCurrent}){${codeRight}}`
                    break
                default:
            }
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

//get return text for logicType.return
function returnText(data) {
    const { key } = data
    switch(key) {
        case 'toast':
            return `{${eventText(data)}}`
        default:
            return returnType[key] ? returnType[key].code : ''
    }
}

function getCodeFromDataProp(obj = {}) {
    switch(obj.type) {
        case panelType.page.key:
            return `'${obj.value}'`
        case panelType.var.key:
            return convertPropertyFields(applyAdjust(obj))
        default:
            return ''
    }
}

//proper string formatting for .adjust
function applyAdjust(obj = {}) {
    let value = obj.value
    if (obj.length) {
        value = `Object.keys(${value}).length`
    }
    return (value && obj.adjust && `${value} + ${obj.adjust}`) || value || obj.adjust || ''
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