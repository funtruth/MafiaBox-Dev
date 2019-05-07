import {
    logicType,
    returnType,
    updateType,
    operatorType,
} from '../common/types'
import { orderOfOp } from './codetool'
import { stringToCode } from '../modal/toast/stringTool';
import {
    parseJS,
    separateField,
    START_CHAR,
} from './proptool'

var beautify_js = require('js-beautify');

export function getCode(library) {
    return beautify_js(`(rss, write, choice)=>{${recursive(library)}}`, {brace_style: 'end-expand'})
}

function recursive(library) {
    if (!library || !library.logicType) return ""

    const {
        logicType: type,
        operatorType: subType,
        data,
    } = library
    
    let codeBody = ''
    let codeRight = recursive(library.right) || ''

    switch(type) {
        case logicType.operator.key:
            switch(subType) {
                case operatorType.if.key:
                    codeBody = `if(${parseJS(data.var1.value)}${(data.comparison && data.comparison.code)||''}${parseJS(data.var2.value)}){${codeRight}}`
                    break
                case operatorType.else.key:
                    codeBody = `else{${codeRight}}`
                    break
                case operatorType.elseif.key:
                    codeBody = `else if(${parseJS(data.var1.value)}${(data.comparison && data.comparison.code)||''}${parseJS(data.var2.value)}){${codeRight}}`
                    break
                case operatorType.forin.key:
                    codeBody = `for(var ${parseJS(data.variableName)} in ${parseJS(data.source)}){${codeRight}}`
                    break
                default:
            }
            break
        case logicType.return.key:
            switch(data.key) {
                case 'toast':
                    codeBody = `return {${eventText(data)}}`
                    break
                default:
                    codeBody = `return ${returnType[data.key] ? returnType[data.key].code : ''}`
            }
            break
        case logicType.variable.key:
            codeBody = declareVars(library.declare) + assignVars(data)
            break
        case logicType.update.key:
            codeBody = updateVars(data)
            break
        case logicType.function.key:
        default:
            codeBody = ''
    }
    
    let codeDown = recursive(library.down)

    return `${codeBody}${codeDown}`
}

function declareVars(declare) {
    let string = '',
        assignTo = '';

    for (var key in declare) {
        const varInfo = declare[key]
        if (varInfo.assign) {
            assignTo = orderOfOp(varInfo.assign)
        }
        string = string.concat(`let ${parseJS(key)} = ${assignTo};`)
    }

    return string
}

function assignVars(data) {
    let string = ''
    for (var field in data) {
        string = string.concat(`${parseJS(field)}=${convertValue(data, field)};`)
    }
    return string
}

function updateVars(data) {
    let string = ''
    for (var field in data) {
        string = string.concat(
            `write.updates[\`${separateField(field).map(i => i.charAt(0) === START_CHAR ? `\${${parseJS(i)}}`: i).join('/')}\`]=${convertValue(data, field)};`
        )
    }
    return string
}

//replace variable properties from foo.$bar to foo[bar] REMOVE
export function convertPropertyFields(string) {
    let parts = string.split('_')

    for (var i=0; i<parts.length; i++) {
        if (parts[i].charAt(0) === '@') {
            parts[i] = `${parts[i]}]`
        }
    }

    parts = parts.join('_').replace(/\$/g, '[').replace(/\.\[/g, '[')

    return parts
}

//$user to ${user} without []'s REMOVE
export function convertString(string) {
    return string.split(' ').map(c => c.charAt(0) === '@' ? `$\{${c.substr(1)}}` : c).join(' ')
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

//handles data value formatting on the right side of the =
function convertValue(data, field) {
    switch(typeof data[field].value) {
        case 'string':
            switch(data[field].updateType) {
                case updateType.number:
                case updateType.variable:
                    return `\`${convertString(data[field].value)}\``
                case updateType.health:
                    return `'${data[field].value}'`
                case updateType.uid:
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