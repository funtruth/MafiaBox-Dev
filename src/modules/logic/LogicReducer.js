import { logicType, returnType, updateType, updateViewType, operatorType, panelType } from './types'
import * as helpers from '../common/helpers'
import { stringToCode } from '../strings/stringTool';

var beautify_js = require('js-beautify');

const initialState = {}

//THUNK FUNCTIONS
export function getCode(key, library) {
    return (dispatch) => {
        return `(rss, write, choice${beautify_js(`)=>{${recursive(key, library)}}`, {brace_style: 'end-expand'})}`
    }
}

//used for LogicPanel to get proper title
export function dataPropToTitle(obj) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        switch(obj.panelType) {
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
            codeCurrent = `${getCodeFromDataProp(data.var1)}${(data.comparison && data.comparison.code)||''}${getCodeFromDataProp(data.var2)}`
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
    parts = helpers.swapVarFormat(parts, false)

    return parts
}

//$user to ${user} without []'s
export function convertString(string) {
    return string.split(' ').map(c => c.charAt(0) === '$' ? `$\{${c.substr(1)}}` : c).join(' ')
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
    switch(obj.panelType) {
        case panelType.page.key:
            return `'${obj.value}'`
        case panelType.var.key:
            switch(obj.updateViewType) {
                case updateViewType.number:
                    return applyAdjust(obj)
                case updateViewType.uid:
                case updateViewType.variable:
                    return convertPropertyFields(applyAdjust(obj))
                default:
                    return ''
            }
        default:
            return ''
    }
}

//proper string formatting for .adjust
function applyAdjust(obj = {}) {
    let { value, adjust } = obj
    if (obj.length) {
        value = `Object.keys(${value}).length`
    }
    return (value && adjust && `${value} + ${adjust}`) || value || adjust || ''
}

//handles data value formatting on the right side of the =
function convertValue(data, field) {
    switch(typeof data[field].value) {
        case 'string':
            switch(data[field].updateViewType) {
                case updateViewType.staticVal:
                case updateViewType.dynamicVal:
                    return updateType[data[field].value].code(data, convertPropertyFields(field))
                case updateViewType.number:
                case updateViewType.variable:
                    return `\`${convertString(data[field].value)}\``
                case updateViewType.health:
                    return `'${data[field].value}'`
                case updateViewType.uid:
                    return helpers.swapVarFormat(data[field].value.substr(1))
                default:
                    return data[field].value
            }
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
        const info = data[field]
        if (!info.value) continue

        if (info.update) {
            string = string.concat(
                `write.updates[\`${field.split('.').map(i => i.charAt(0) === '$' ? `\${${helpers.swapVarFormat(i.substring(1), false)}}`:i).join('/')}\`]=${convertValue(data, field)};`
            )
        }
        
        if (info.mutate) {
            string = string.concat(
                `rss.${convertPropertyFields(field)}=${convertValue(data, field)};`
            )
        }

        switch(info.updateViewType) {
            case updateViewType.trigger:
                string = string.concat(`${convertPropertyFields(field)}=(visitor)=>{${getUpdateCode(info.value)}}`)
                break
            case updateViewType.events:
                Object.keys(info.value).forEach(stringKey => {
                    string = string.concat(`write.updates[\`events/\${write.ts++}\`]={${eventText(info.value[stringKey])}};`)
                })
                break
            case updateViewType.timer:
                string = string.concat(
                    `write.updates[\`${field.split('.').map(i => i.charAt(0) === '$' ? `\${${i.substring(1)}}` : i)
                    .join('/')}\`]=Date.now() + ${info.value};`
                )
                break
            default:
        }
    }
    return string
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}