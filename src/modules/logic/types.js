import { dropdownType } from "../common/types";

export const logicType = {
    operator: {
        key: 'operator',
        index: 0,
        title: 'operator',
        icon: 'ion-md-code-working',
        color: 'Mediumslateblue',
        dropdown: dropdownType.pickOperator,
    },
    variable: {
        key: 'variable',
        index: 1,
        title: 'variable',
        icon: 'mdi mdi-pen',
        color: 'Mediumslateblue',
    },
    function: {
        key: 'function',
        index: 2,
        title: 'function',
        icon: 'mdi mdi-function-variant',
        color: '#3864ab',
    },
    update: {
        key: 'update',
        index: 3,
        title: 'update',
        icon: 'mdi mdi-code-braces',
        color: '#a566b0',
    },
    event: {
        key: 'event',
        index: 4,
        title: 'event',
        icon: 'mdi mdi-calendar',
        color: '#3864ab',
    },
    return: {
        key: 'return',
        index: 5,
        title: 'return',
        icon: 'mdi mdi-page-next',
        color: '#1e9939',
    },
}

export const operatorType = {
    if: {
        key: 'if',
        index: 0,
        title: 'if',
        icon: 'mdi mdi-ray-start-arrow',
        color: 'yellow',
        logicType: logicType.operator.key,
    },
    else: {
        key: 'else',
        index: 1,
        title: 'else',
        icon: 'mdi mdi-redo-variant',
        color: '#db4757',
        logicType: logicType.operator.key,
    },
    elseif: {
        key: 'elseif',
        index: 2,
        title: 'else if',
        icon: 'mdi mdi-swap-horizontal-variant',
        color: '#2e6db4',
        logicType: logicType.operator.key,
    },
    forin: {
        key: 'forin',
        index: 3,
        title: 'for',
        icon: 'mdi mdi-sync',
        color: '#f9812a',
        logicType: logicType.operator.key,
    },
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

export const parseType = {
    normal: 'parseType/normal',
    variable: 'parseType/variable',
    operation: 'parseType/operation',
}

export const updateType = {
    number: 'updateType/number',
    boolean: 'updateType/boolean',
    health: 'updateType/health',
    timer: 'updateType/timer',
    string: 'updateType/string',

    variable: 'updateType/variable',
    page: 'updateType/page',
    uid: 'updateType/uid',
    trigger: 'updateType/trigger',
    events: 'updateType/events',
}

export const numUpdateType = {
    setTo: {
        key: 'setTo',
        index: 0,
        title: 'set to',
        icon: 'mdi mdi-numeric',
    },
    incrBy: {
        key: 'incrBy',
        index: 1,
        title: 'increment by',
        icon: 'mdi mdi-alpha-n-box',
        mathOperatorType: mathOperatorType.add,
    },
    decrBy: {
        key: 'decrBy',
        index: 2,
        title: 'decrement by',
        icon: 'ion-md-download',
        mathOperatorType: mathOperatorType.subtract,
    },
}

export const boolUpdateType = {
    true: {
        key: 'true',
        index: 0,
        title: 'true',
        icon: 'mdi mdi-code-tags-check',
    },
    false: {
        key: 'false',
        index: 1,
        title: 'false',
        icon: 'mdi mdi-close-box-outline',
    },
}

export const healthUpdateType = {
    attack1: {
        key: 'attack1',
        index: 0,
        title: 'Basic Attack',
        icon: 'mdi mdi-sword',
        code: () => '-1',
    },
    attack2: {
        key: 'attack2',
        index: 1,
        title: 'Strong Attack',
        icon: 'mdi mdi-sword',
        code: () => '-2',
    },
    attack3: {
        key: 'attack3',
        index: 2,
        title: 'Superior Attack',
        icon: 'mdi mdi-sword',
        code: () => '-100',
    },
    defend1: {
        key: 'defend1',
        index: 3,
        title: 'Basic Defense',
        icon: 'mdi mdi-shield-half-full',
        code: () => '1',
    },
    defend2: {
        key: 'defend2',
        index: 4,
        title: 'Strong Defense',
        icon: 'mdi mdi-shield',
        code: () => '2',
    },
    defend3: {
        key: 'defend3',
        index: 5,
        title: 'Superior Defense',
        icon: 'mdi mdi-shield-plus',
        code: () => '100',
    },
}

export const variableType = {
    number: {
        key: 'number',
        title: 'Number',
        icon: 'mdi mdi-numeric',
        supertype: '',
        declarable: true,
    },
    string: {
        key: 'string',
        title: 'String',
        icon: 'mdi mdi-alpha-s-circle-outline',
        supertype: '',
        declarable: false,
    },
    boolean: {
        key: 'boolean',
        title: 'Boolean',
        icon: 'mdi mdi-toggle-switch',
        supertype: '',
        declarable: true,
    },
    uid: {
        key: 'uid',
        title: 'Player ID',
        icon: 'mdi mdi-account',
        supertype: 'key',
        declarable: true,
    },
    object: {
        key: 'object',
        title: 'Object',
        icon: 'mdi mdi-code-braces',
        supertype: '',
        declarable: false,
    },
    uidObject: {
        key: 'uidObject',
        title: 'UID Object',
        icon: 'mdi mdi-code-braces',
        supertype: 'object',
        declarable: false,
    },
    array: {
        key: 'array',
        title: 'Array',
        icon: 'mdi mdi-code-brackets',
        supertype: '',
        declarable: false,
    },
    function: {
        key: 'function',
        title: 'Function',
        icon: 'mdi mdi-function',
        supertype: '',
        declarable: false,
    },
    global: {
        key: 'global',
        title: 'Global',
        icon: 'mdi mdi-earth',
        supertype: '',
        declarable: false,
    },
    key: {
        key: 'key',
        title: 'Key',
        icon: 'mdi mdi-key-variant',
        supertype: '',
        declarable: false,
    },
    time: {
        key: 'time',
        title: 'Timer',
        icon: 'mdi mdi-timer-sand',
        supertype: '',
        declarable: false,
    }
}

export const comparisonType = {
    equal: {
        key: 'equal',
        code: '===',
        title: 'equal',
        icon: 'mdi mdi-equal',
    },
    notEqual: {
        key: 'notEqual',
        code: '!==',
        title: 'not equal',
        icon: 'mdi mdi-not-equal',
    },
    greaterThan: {
        key: 'greaterThan',
        code: '>',
        title: 'greater than',
        icon: 'mdi mdi-greater-than',
        variableTypes: [
            variableType.number.key,
        ],
    },
    greaterThanOrEqualTo: {
        key: 'greaterThanOrEqualTo',
        code: '>=',
        title: 'greater than / equal',
        icon: 'mdi mdi-greater-than-or-equal',
        variableTypes: [
            variableType.number.key,
        ],
    },
    lessThan: {
        key: 'lessThan',
        code: '<',
        title: 'less than',
        icon: 'mdi mdi-less-than',
        variableTypes: [
            variableType.number.key,
        ],
    },
    lessThanOrEqualTo: {
        key: 'lessThanOrEqualTo',
        code: '<=',
        title: 'less than / equal',
        icon: 'mdi mdi-less-than-or-equal',
        variableTypes: [
            variableType.number.key,
        ],
    },
}

export const returnType = {
    true: {
        key: 'true',
        index: 0,
        title: 'true',
        icon: 'mdi mdi-checkbox-marked-circle',
    },
    false: {
        key: 'false',
        index: 1,
        title: 'false',
        icon: 'mdi mdi-close-circle',
    },
}

export const mathType = {
    value: 'mathType/value',
    constant: 'mathType/constant',
    operation: 'mathType/operation',
}

export const logicDNDType = {
    item: 'item',
}