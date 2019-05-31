import {
    mathType,
} from '../common/types'
import { parseJS } from './proptool'

//TODO this whole file is garbage now :)
export function orderOfOp(assign) {
    if (!assign) return ''
    
    switch(assign.mathType) {
        case mathType.operation:
            return `(${orderOfOp(assign.left||{})} ${assign.mathOperatorType.char} ${orderOfOp(assign.right||{})})`
        case mathType.value:
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
        case mathType.operation:
            if (compileMath(assign.right) || compileMath(assign.left)) return true
            break
        default:
            return true
    }
    return false
}