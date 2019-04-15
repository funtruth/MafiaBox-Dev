export const ItemTypes = {
    VALUE: 'value',
    OPERATION: 'operation',
}

export const mathType = {
    value: 'mathType/value',
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
export const DEFAULT_VALUE_ASSIGN = DEFAULT_ASSIGN
export const DEFAULT_BASIC_OP_ASSIGN = DEFAULT_ASSIGN

export function orderOfOp(assign) {
    switch(assign.mathType) {
        case mathType.operation:
            return `(${orderOfOp(assign.left||{})} ${assign.mathOperatorType.char} ${orderOfOp(assign.right||{})})`
        case mathType.value.key:
            return assign.value
        default:
            return ''
    }
}

//return true if there is error
export function compileMath(assign) {
    if (!assign) return true

    if (assign.mathType === mathType.operation) {
        if (compileMath(assign.right) || compileMath(assign.left)) return true
    } else if (assign.mathType === mathType.value.key) {
        if (assign.value === '') return true
    } else return true
    
    return false
}