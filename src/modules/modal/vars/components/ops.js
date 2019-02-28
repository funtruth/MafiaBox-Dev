import * as helpers from '../../../common/helpers'

export const basicOpType = {
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

export const opType = {
    NaN: {
        key: 'NaN',
    },
    basicOp: {
        key: 'basicOp',
    },
    value: {
        key: 'value',
    },
}

export const opValueType = {
    constant: {
        key: 'constant',
    },
    variable: {
        key: 'variable',
    }
}

export const DEFAULT_ASSIGN = {
    opType: opType.NaN.key,
    opValueType: opValueType.constant.key,
    basicOpType: '',
    value: '0',
}

export const DEFAULT_VALUE_ASSIGN = {
    opType: opType.value.key,
    opValueType: opValueType.constant.key,
    basicOpType: '',
    value: '0',
}

export const DEFAULT_BASIC_OP_ASSIGN = {
    opType: opType.basicOp.key,
    opValueType: opValueType.constant.key,
    basicOpType: '',
    value: '0',
    left: DEFAULT_VALUE_ASSIGN,
    right: DEFAULT_VALUE_ASSIGN,
}

export function orderOfOp(assign) {
    switch(assign.opType) {
        case opType.basicOp.key:
            return `(${orderOfOp(assign.left||{})} ${assign.basicOpType.char} ${orderOfOp(assign.right||{})})`
        case opType.value.key:
            switch(assign.opValueType) {
                case opValueType.constant.key:
                    return `${assign.value}`
                case opValueType.variable.key:
                    return `${helpers.remove$(assign.value.key)}`
                default:
                    return ''
            }
        default:
            return ''
    }
}

//return true if there is error
export function compileMath(assign) {
    if (!assign) return true

    if (assign.opType === opType.basicOp.key) {
        if (compileMath(assign.right) || compileMath(assign.left)) return true
    } else if (assign.opType === opType.value.key) {
        if (assign.value === '') return true
    } else return true
    
    return false
}