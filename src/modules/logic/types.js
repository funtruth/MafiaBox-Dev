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
    elseif: {
        key: 'elseif',
        index: 2,
        title: 'else if',
        icon: 'ion-ios-more',
        color: '#0e7db4',
    },
    else: {
        key: 'else',
        index: 3,
        title: 'else',
        icon: 'ion-ios-more',
        color: '#db4757',
    },
    operator: {
        key: 'operator',
        index: 4,
        title: 'operator',
        icon: 'ion-md-code-working',
        color: 'Mediumslateblue',
    },
    function: {
        key: 'function',
        index: 5,
        title: 'function',
        icon: 'ion-md-pulse',
        color: '#3864ab',
    },
    update: {
        key: 'update',
        index: 6,
        title: 'update',
        icon: 'mdi mdi-code-braces',
        color: '#a566b0',
    },
    return: {
        key: 'return',
        index: 7,
        title: 'return',
        icon: 'ion-ios-send',
        color: '#1e9939',
    },
}

export const comparisonType = {
    equal: {
        key: 'equal',
        code: '===',
        title: '===',
    },
    notEqual: {
        key: 'notEqual',
        code: '!==',
        title: '!==',
    },
    greaterThan: {
        key: 'greaterThan',
        code: '>',
        title: '>',
    },
    greaterThanOrEqualTo: {
        key: 'greaterThanOrEqualTo',
        code: '>=',
        title: '≥',
    },
    lessThan: {
        key: 'lessThan',
        code: '<',
        title: '>',
    },
    lessThanOrEqualTo: {
        key: 'lessThanOrEqualTo',
        code: '<=',
        title: '≤',
    },
}

export const updateFamilyType = {
    number: 'family/number',
    boolean: 'family/boolean',
}

export const valueType = {
    staticVal: 'valueType/staticVal',
    dynamicVal: 'valueType/dynamicVal',
    page: 'valueType/page',
    uid: 'valueType/uid',
}

//possible static and dynamic update types
export const updateType = {
    null: {
        key: 'null',
        index: 0,
        family: updateFamilyType.number,
        title: 'null',
        label: 'null',
        icon: 'mdi mdi-swap-horizontal-bold',
        valueType: valueType.staticVal,
    },
    setTo: {
        key: 'setTo',
        index: 1,
        family: updateFamilyType.number,
        title: 'set to value',
        label: 'set to value',
        icon: 'mdi mdi-numeric',
        valueType: valueType.dynamicVal,
    },
    incr: {
        key: 'incr',
        index: 2,
        family: updateFamilyType.number,
        title: 'increment',
        icon: 'mdi mdi-numeric-1-box',
        valueType: valueType.staticVal,
    },
    incrBy: {
        key: 'incrBy',
        index: 3,
        family: updateFamilyType.number,
        title: 'increment by',
        icon: 'mdi mdi-alpha-n-box',
        valueType: valueType.dynamicVal,
    },
    decr: {
        key: 'decr',
        index: 4,
        family: updateFamilyType.number,
        title: 'decrement',
        icon: 'ion-md-arrow-round-down',
        valueType: valueType.staticVal,
    },
    decrBy: {
        key: 'decrBy',
        index: 5,
        family: updateFamilyType.number,
        title: 'decrement by',
        icon: 'ion-md-download',
        valueType: valueType.dynamicVal,
    },
    true: {
        key: 'true',
        index: 6,
        family: updateFamilyType.boolean,
        title: 'true',
        icon: 'mdi mdi-code-tags-check',
        valueType: valueType.staticVal,
    },
    false: {
        key: 'false',
        index: 7,
        family: updateFamilyType.boolean,
        title: 'false',
        icon: 'mdi mdi-close-box-outline',
        valueType: valueType.staticVal,
    }
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

export const returnType = {
    true: {
        key: 'true',
        index: 0,
        title: 'true',
        icon: 'mdi mdi-code-tags-check',
        code: 'true',
    },
    false: {
        key: 'false',
        index: 1,
        title: 'false',
        icon: 'mdi mdi-close-box-outline',
        code: 'false',
    },
    push: {
        key: 'push',
        index: 2,
        title: 'push updates',
        icon: 'mdi mdi-firebase',
        code: 'database.update(updates)',
    }
}