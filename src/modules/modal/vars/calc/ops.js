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
    }
}

export const opBubbleType = {
    basicOp: {
        key: 'basicOp',
    },
    value: {
        key: 'value',
    },
}

export const defaultAssign = {
    type: opBubbleType.value.key,
}