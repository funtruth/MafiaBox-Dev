export const logicType = {
    none: {
        key: 'none',
        index: 0,
        title: 'none',
        icon: 'ion-md-create',
        color: '#767676',
    },
    if: {
        key: 'if',
        index: 1,
        title: 'if',
        icon: 'ion-md-help',
        color: '#af8c40',
    },
    else: {
        key: 'else',
        index: 2,
        title: 'else',
        icon: 'ion-ios-more',
        color: '#db4757',
    },
    elseif: {
        key: 'elseif',
        index: 3,
        title: 'else if',
        icon: 'ion-ios-more',
        color: '#0e7db4',
    },
    operator: {
        key: 'operator',
        index: 4,
        title: 'operator',
        icon: 'ion-md-code-working',
        color: 'Mediumslateblue'
    },
    function: {
        key: 'function',
        index: 5,
        title: 'function',
        icon: 'ion-md-pulse',
        color: '#3864ab',
    },
    return: {
        key: 'return',
        index: 6,
        title: 'return',
        icon: 'ion-ios-send',
        color: '#1e9939',
    },
    update: {
        key: 'update',
        index: 7,
        title: 'update',
        icon: 'mdi mdi-code-braces',
        color: '#a566b0',
    },
}

export const comparisonType = {
    e: {
        key: 'e',
        code: '===',
        title: '===',
    },
    nE: {
        key: 'nE',
        code: '!==',
        title: '!==',
    },
    gT: {
        key: 'gT',
        code: '>',
        title: '>',
    },
    gTOET: {
        key: 'gTOET',
        code: '>=',
        title: '≥',
    },
    lT: {
        key: 'lT',
        code: '<',
        title: '>',
    },
    lTOET: {
        key: 'lTOET',
        code: '<=',
        title: '≤',
    },
}

export const updateType = {
    staticVal: 'updateType/staticVal',
    dynamicVal: 'updateType/dynamicVal',
    phase: 'updateType/phase',
    uid: 'updateType/uid',
}

export const valueType = {
    null: {
        key: 'null',
        index: 1,
        title: 'null',
        label: 'null',
        icon: 'mdi mdi-swap-horizontal-bold',
        updateType: updateType.staticVal,
    },
    setTo: {
        key: 'setTo',
        index: 1,
        title: 'set to value',
        label: 'set to value',
        icon: 'mdi mdi-numeric',
        updateType: updateType.dynamicVal,
    },
    i: {
        key: 'i',
        index: 2,
        title: 'increment',
        icon: 'mdi mdi-numeric-1-box',
        updateType: updateType.staticVal,
    },
    iB: {
        key: 'iB',
        index: 3,
        title: 'increment by',
        icon: 'mdi mdi-alpha-n-box',
        updateType: updateType.dynamicVal,
    },
    d: {
        key: 'd',
        index: 4,
        title: 'decrement',
        icon: 'ion-md-arrow-round-down',
        updateType: updateType.staticVal,
    },
    dB: {
        key: 'dB',
        index: 5,
        title: 'decrement by',
        icon: 'ion-md-download',
        updateType: updateType.dynamicVal,
    },
}

export const defaultLogic = {
    START: {
        logicType: logicType.none.key,
    }
}

export const variableType = {
    any: {
        key: 'any',
        title: 'Any',
        icon: 'mdi mdi-variable'
    },
    number: {
        key: 'number',
        title: 'Number',
        icon: 'mdi mdi-numeric-1-box'
    },
    string: {
        key: 'string',
        title: 'String',
        icon: 'mdi mdi-code-string'
    },
    uid: {
        key: 'uid',
        title: 'Unique ID',
        icon: 'mdi mdi-account'
    },
    object: {
        key: 'object',
        title: 'Object',
        icon: 'mdi mdi-code-braces'
    },
    array: {
        key: 'array',
        title: 'Array',
        icon: 'mdi mdi-code-brackets'
    },
}