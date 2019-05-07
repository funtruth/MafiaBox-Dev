import {
    mathType,
    returnType,
} from '../common/types'
import { parseJS } from './proptool'

//PickReturnType
export function codeReturnType(key) {
    switch(key) {
        case returnType.true.key:
            return 'return true'
        case returnType.false.key:
            return 'return false'
        case returnType.push.key:
            return 'return write.db.update(write.updates)'
        default:
            console.warn('case does not exist. codeReturnType, logic/types', key)
            return ""
    }
}

export function orderOfOp(assign) {
    if (!assign) return ''
    
    switch(assign.mathType) {
        case mathType.operation:
            return `(${orderOfOp(assign.left||{})} ${assign.mathOperatorType.char} ${orderOfOp(assign.right||{})})`
        case mathType.number:
            return assign.value
        case mathType.variable:
            return parseJS(assign.value)
        default:
            return ''
    }
}

//return true if there is error
export function compileMath(assign) {
    if (!assign) return true

    switch(assign.mathType) {
        case mathType.value:
            if (assign.value === '') return true
            break
        case mathType.number:
        case mathType.variable:
            break
        case mathType.operation:
            if (compileMath(assign.right) || compileMath(assign.left)) return true
            break
        default:
            return true
    }
    return false
}