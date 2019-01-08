export const logicType = {
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
    transient: {
        key: 'transient',
        index: 7,
        title: 'transient',
        icon: 'mdi mdi-timeline-text',
        color: '#eF9000',
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
    health: 'family/health',
}

export const valueType = {
    staticVal: 'valueType/staticVal',
    dynamicVal: 'valueType/dynamicVal',
    page: 'valueType/page',
    uid: 'valueType/uid',
    health: 'valueType/health',
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
        code: () => 'null',
    },
    setTo: {
        key: 'setTo',
        index: 1,
        family: updateFamilyType.number,
        title: 'set to value',
        label: 'set to value',
        icon: 'mdi mdi-numeric',
        valueType: valueType.dynamicVal,
        code: (data, field) => `${data[field].dynamic}`,
    },
    incr: {
        key: 'incr',
        index: 2,
        family: updateFamilyType.number,
        title: 'increment',
        icon: 'mdi mdi-numeric-1-box',
        valueType: valueType.staticVal,
        code: (data, field) => `${field} + 1`,
    },
    incrBy: {
        key: 'incrBy',
        index: 3,
        family: updateFamilyType.number,
        title: 'increment by',
        icon: 'mdi mdi-alpha-n-box',
        valueType: valueType.dynamicVal,
        code: (data, field) => `${field} + ${data[field].dynamic}`,
    },
    decr: {
        key: 'decr',
        index: 4,
        family: updateFamilyType.number,
        title: 'decrement',
        icon: 'ion-md-arrow-round-down',
        valueType: valueType.staticVal,
        code: (data, field) => `${field} - 1`,
    },
    decrBy: {
        key: 'decrBy',
        index: 5,
        family: updateFamilyType.number,
        title: 'decrement by',
        icon: 'ion-md-download',
        valueType: valueType.dynamicVal,
        code: (data, field) => `${field} - ${data[field].dynamic}`,
    },
    true: {
        key: 'true',
        index: 6,
        family: updateFamilyType.boolean,
        title: 'true',
        icon: 'mdi mdi-code-tags-check',
        valueType: valueType.staticVal,
        code: () => 'true',
    },
    false: {
        key: 'false',
        index: 7,
        family: updateFamilyType.boolean,
        title: 'false',
        icon: 'mdi mdi-close-box-outline',
        valueType: valueType.staticVal,
        code: () => 'false',
    },
    attack1: {
        key: 'attack1',
        index: 0,
        family: updateFamilyType.health,
        title: 'Basic Attack',
        label: ['mdi mdi-sword'],
        icon: 'mdi mdi-sword',
        valueType: valueType.health,
        code: () => '-1',
    },
    attack2: {
        key: 'attack2',
        index: 1,
        family: updateFamilyType.health,
        title: 'Strong Attack',
        label: ['mdi mdi-sword', 'mdi mdi-sword'],
        icon: 'mdi mdi-sword',
        valueType: valueType.health,
        code: () => '-2',
    },
    attack3: {
        key: 'attack3',
        index: 2,
        family: updateFamilyType.health,
        title: 'Superior Attack',
        label: ['mdi mdi-sword', 'mdi mdi-sword', 'mdi mdi-sword'],
        icon: 'mdi mdi-sword',
        valueType: valueType.health,
        code: () => '-100',
    },
    defend1: {
        key: 'defend1',
        index: 3,
        family: updateFamilyType.health,
        title: 'Basic Defense',
        label: ['mdi mdi-shield-half-full'],
        icon: 'mdi mdi-shield-half-full',
        valueType: valueType.health,
        code: () => '1',
    },
    defend2: {
        key: 'defend2',
        index: 4,
        family: updateFamilyType.health,
        title: 'Strong Defense',
        label: ['mdi mdi-shield-half-full', 'mdi mdi-shield-half-full'],
        icon: 'mdi mdi-shield',
        valueType: valueType.health,
        code: () => '2',
    },
    defend3: {
        key: 'defend3',
        index: 5,
        family: updateFamilyType.health,
        title: 'Superior Defense',
        label: ['mdi mdi-shield-half-full', 'mdi mdi-shield-half-full', 'mdi mdi-shield-half-full'],
        icon: 'mdi mdi-shield-plus',
        valueType: valueType.health,
        code: () => '100',
    },
}

export const defaultLogic = {
    START: {
        logicType: '',
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
    boolean: {
        key: 'boolean',
        title: 'Boolean',
        icon: 'mdi mdi-nintendo-switch',
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