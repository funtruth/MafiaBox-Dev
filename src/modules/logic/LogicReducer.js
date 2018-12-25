import { logicType, comparisonType } from './types'
var beautify_js = require('js-beautify');

const initialState = {
}

export function getCode(key, library) {
    return (dispatch, getState) => {
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
                codeCurrent = `${data.var1 || ''}${data['var1.adjust'] || ''}${(data.comparison && comparisonType[data.comparison].code) || ''}${data.var2 || ''}${data['var2.adjust'] || ''}`
                break
            case logicType.return.key:
                codeCurrent = data
                break
            case logicType.update.key:
                codeCurrent = data
                break
            case logicType.none.key:
            case logicType.else.key:
            case logicType.function.key:
            default:
        }
        if (!codeCurrent) codeCurrent = ''
    
        let codeBody = ''
        let codeRight = dispatch(getCode(library[key].right, library)) || '\n'
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
                codeBody = `database.push({${codeCurrent}});`
                break
            case logicType.none.key:
            default:
                codeBody = ''
        }
        
        let codeDown = library[key].down ? dispatch(getCode(library[key].down, library)) : ''
    
        return beautify_js(`${codeBody}${codeDown}`, {brace_style: 'end-expand'})
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}