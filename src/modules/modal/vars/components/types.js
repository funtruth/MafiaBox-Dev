import { parseJS } from "../../../logic/proptool";

export const ItemTypes = {
    VALUE: 'value',
    OPERATION: 'operation',
}

export const mathType = {
    value: 'mathType/value',
    number: 'mathType/number',
    variable: 'mathType/variable',
    operation: 'mathType/operation',
}

export const mathOperatorType = {
    add: {
        key: 'add',
        char: '+',
        icon: 'mdi mdi-plus',
    },
    subtract: {
        key: 'subtract',
        char: '-',
        icon: 'mdi mdi-minus',
    },
    multiply: {
        key: 'multiply',
        char: '*',
        icon: 'mdi mdi-close',
    },
    divide: {
        key: 'divide',
        char: '/',
        icon: 'mdi mdi-division',
    },
    mod: {
        key: 'mod',
        char: '%',
        icon: 'mdi mdi-percent',
    },
}

/* @params logicItem.data.assign
    mathType => is this a value (value)? or an operation (value)(operator)(value)
    mathOperatorType => just the mathematical operator (+-/*%)
*/
export const DEFAULT_ASSIGN = {
    mathType: "",
    mathOperatorType: "",
    value: "",
    left: "",
    right: "",
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