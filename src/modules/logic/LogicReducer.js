import { logicType, comparisonType, returnType, updateType } from './types'
var beautify_js = require('js-beautify');

const initialState = {}

export function getCode(fieldInfo, key, library) {
    const { fieldKey, vars } = fieldInfo
    return (dispatch, getState) => {
        return beautify_js(`const ${fieldKey}=(${Object.keys(vars).join(',')})=>{${recursive(key, library)}}`,
            {brace_style: 'end-expand'})
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
            codeCurrent = returnType[data] ? returnType[data].code : ''
            break
        case logicType.update.key:
            for (var field in data) {
                if (!data[field].value) continue

                if (data[field].update) {
                    codeCurrent = codeCurrent.concat(
                        `updates[\`${field.split('.').map(i => i.charAt(0) === '$' ? `\${${i.substring(1)}}` : i)
                        .join('/')}\`]=${convertValue(data, field)};`
                    )
                }
                
                if (data[field].mutate) {
                    codeCurrent = codeCurrent.concat(
                        `${convertPropertyFields(field)}=${convertValue(data, field)};`
                    )
                }
            }
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
function convertPropertyFields(string) {
    let parts = string.split('.')

    for (var i=0; i<parts.length; i++) {
        if (parts[i].charAt(0) === '$') {
            parts[i] = `${parts[i]}]`
        }
    }

    parts = parts.join('.').replace(/\.\$/g, '[')

    return parts
}

//handles data value formatting on the right side of the =
function convertValue(data, field) {
    return typeof data[field].value === 'string' ?
        updateType[data[field].value] ?
            updateType[data[field].value].code(data, convertPropertyFields(field))
            :`'${data[field].value}'`
        :`${data[field].value}`
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}