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
    opType: opType.value.key,
    opValueType: '',
    basicOpType: '',
    value: '',
}