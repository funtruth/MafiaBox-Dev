import { logicType, returnType, updateType, updateViewType, operatorType, panelType } from './types'
import * as helpers from '../common/helpers'
import { orderOfOp } from '../modal/vars/components/ops'
import { stringToCode } from '../modal/toast/stringTool';

var beautify_js = require('js-beautify');

const initialState = {}

//THUNK FUNCTIONS
export function getCode(library) {
    return (dispatch) => {
        return beautify_js(`(rss, write, choice)=>{${recursive(library)}}`, {brace_style: 'end-expand'})
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

export function updateVariables(logicInfo) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let newVars = {}

        switch(logicInfo.logicType) {
            case logicType.function.key:
                newVars = logicInfo.data && logicInfo.data.var1 && logicInfo.data.var1.value &&
                    pageRepo[logicInfo.data.var1.value] && pageRepo[logicInfo.data.var1.value].vars
                break
            case logicType.operator.key:
                switch(logicInfo.operatorType) {
                    case operatorType.forin.key:
                        newVars = logicInfo.data && logicInfo.data.declare ?
                            {[logicInfo.data.declare.key]: logicInfo.data.declare} : {}
                        break
                    default:
                }
                break
            case logicType.variable.key:
                if (logicInfo.data && logicInfo.data.isBeingAssigned) {
                    newVars = {}
                } else {
                    newVars = logicInfo.data
                }
                break
            default:
        }

        return newVars
    }
}

function recursive(library) {
    if (!library || !library.logicType) return ""

    const {
        logicType: type,
        operatorType: opType,
        data,
    } = library
    
    let codeCurrent = ''
    switch(type) {
        case logicType.operator.key:
            codeCurrent = `${getCodeFromDataProp(data.var1)}${(data.comparison && data.comparison.code)||''}${getCodeFromDataProp(data.var2)}`
            break
        case logicType.variable.key:
            codeCurrent = declareOrAssign(data)
            break
        case logicType.return.key:
            switch(data.key) {
                case 'toast':
                    codeCurrent = `{${eventText(data)}}`
                    break
                default:
                    codeCurrent = returnType[data.key] ? returnType[data.key].code : ''
                    break
            }
            break
        case logicType.update.key:
            codeCurrent = codeCurrent.concat(getUpdateCode(data))
            break
        case logicType.function.key:
        default:
    }

    if (!codeCurrent) codeCurrent = ''

    let codeBody = ''
    let codeRight = recursive(library.right) || ''
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
                case operatorType.forin.key:
                    codeBody = `for(var ${(data.declare && data.declare.key && helpers.remove$(data.declare.key))||''} in ${helpers.remove$(data.value)}){${codeCurrent}${codeRight}}`
                    break
                default:
            }
            break
        case logicType.variable.key:
            codeBody = `${codeCurrent}`
            break
        case logicType.function.key:
            codeBody = `${codeCurrent}${codeRight}`
            break
        case logicType.return.key:
            codeBody = `return ${codeCurrent}`
            break
        case logicType.update.key:
            codeBody = `${codeCurrent}${codeRight}`
            break
        default:
            codeBody = ''
    }
    
    let codeDown = recursive(library.down)

    return helpers.swapVarFormat(`${codeBody}${codeDown}`, false)
}

function declareOrAssign(data) {
    let scope = 'let', string = '', assignTo = ''
    for (var key in data) {
        const varInfo = data[key]
        if (varInfo.isBeingAssigned) {
            scope = ''
        }
        if (varInfo.assign) {
            assignTo = orderOfOp(varInfo.assign)
        }
        string = string.concat(`${scope} ${helpers.remove$(key)} = ${assignTo};`)
    }
    return string
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

//$user to ${user} without []'s
export function convertString(string) {
    return string.split(' ').map(c => c.charAt(0) === '$' ? `$\{${c.substr(1)}}` : c).join(' ')
}

//converts the variables in event text properly
function eventText(object) {
    const eventKeys = ['string', 'showTo', 'hideFrom']
    return eventKeys.map(k => {
        return k in object ?
            `${k}:${typeof object[k] === 'string' ?
                `\`${stringToCode(object[k])}\``
                :`{${Object.keys(object[k]).map(u => `${convertPropertyFields(u)}:true,`)}}`
            },`
            :''
    }).join('')
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
                    return obj.value.substr(1)
                case updateViewType.variable:
                    return `rss.${convertPropertyFields(applyAdjust(obj))}`
                case updateViewType.staticVal:
                case updateViewType.dynamicVal:
                    return updateType[obj.value].title
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
                    return data[field].value.substr(1)
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

        if (info.update) {
            string = string.concat(
                `write.updates[\`${field.split('.').map(i => i.charAt(0) === '$' ? `\${${i.substring(1)}}`:i).join('/')}\`]=${convertValue(data, field)};`
            )
        }
        
        if (info.mutate) {
            string = string.concat(
                `rss.${convertPropertyFields(field)}=${convertValue(data, field)};`
            )
        }

        switch(info.updateViewType) {
            case updateViewType.trigger:
                string = string.concat(`rss.${convertPropertyFields(field)}=(visitor)=>{${recursive(info)}}`)
                break
            case updateViewType.events:
                string = string.concat(
                    Object.keys(info.value)
                        .map(stringKey => `write.updates[\`events/\${write.ts++}\`]={${eventText(info.value[stringKey])}};`)
                        .join('')
                )
                break
            case updateViewType.timer:
                string = string.concat(
                    `write.updates[\`${field.split('.').map(i => i.charAt(0) === '$' ? `\${${i.substring(1)}}` : i)
                    .join('/')}\`]=Date.now() + ${info.value};`)
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