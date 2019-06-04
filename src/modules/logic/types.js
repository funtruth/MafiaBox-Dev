import { dropdownType } from "../common/types";

export const logicType = {
    operator: {
        key: 'operator',
        index: 0,
        title: 'operator',
        icon: 'ion-md-code-working',
        color: 'violet',
        dropdown: dropdownType.pickOperator,
    },
    variable: {
        key: 'variable',
        index: 1,
        title: 'variable',
        icon: 'mdi mdi-pen',
        color: 'violet',
    },
    function: {
        key: 'function',
        index: 2,
        title: 'function',
        icon: 'mdi mdi-function-variant',
        color: 'fb',
    },
    update: {
        key: 'update',
        index: 3,
        title: 'update',
        icon: 'mdi mdi-code-braces',
        color: 'pink',
    },
    event: {
        key: 'event',
        index: 4,
        title: 'event',
        icon: 'mdi mdi-calendar',
        color: 'fb',
    },
    return: {
        key: 'return',
        index: 5,
        title: 'return',
        icon: 'mdi mdi-page-next',
        color: 'green',
    },
}

export const operatorType = {
    if: {
        key: 'if',
        index: 0,
        title: 'if',
        value: {
            left: "if(",
            right: ")",
        },
        icon: 'mdi mdi-ray-start-arrow',
        color: 'yellow',
        logicType: logicType.operator.key,
    },
    else: {
        key: 'else',
        index: 1,
        title: 'else',
        value: {
            left: "else",
            right: "",
        },
        icon: 'mdi mdi-redo-variant',
        color: 'red',
        logicType: logicType.operator.key,
    },
    elseif: {
        key: 'elseif',
        index: 2,
        title: 'else if',
        value: {
            left: "else if(",
            right: ")",
        },
        icon: 'mdi mdi-swap-horizontal-variant',
        color: 'fb',
        logicType: logicType.operator.key,
    },
    forin: {
        key: 'forin',
        index: 3,
        title: 'for',
        value: {
            left: "for(var",
            right: ")",
        },
        icon: 'mdi mdi-sync',
        color: 'orange',
        logicType: logicType.operator.key,
    },
}

export const parseType = {
    constant: 'parseType/constant',
    collection: 'parseType/collection',
    operation: 'parseType/operation',
    string: 'parseType/string',
    number: 'parseType/number',
    variable: 'parseType/variable',
    wrapper: 'parseType/wrapper',
    update: 'parseType/update',
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
        parseBy: parseType.number,
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
        parseBy: parseType.variable,
    },
    uid: {
        key: 'uid',
        title: 'Player ID',
        icon: 'mdi mdi-account',
        supertype: 'key',
        declarable: true,
        parseBy: parseType.variable,
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
        showInPickComparison: true,
    },
    notEqual: {
        key: 'notEqual',
        code: '!==',
        title: 'not equal',
        icon: 'mdi mdi-not-equal',
        showInPickComparison: true,
    },
    greaterThan: {
        key: 'greaterThan',
        code: '>',
        title: 'greater than',
        icon: 'mdi mdi-greater-than',
        showInPickComparison: true,
        variableTypes: [
            variableType.number.key,
        ],
    },
    greaterThanOrEqualTo: {
        key: 'greaterThanOrEqualTo',
        code: '>=',
        title: 'greater than / equal',
        icon: 'mdi mdi-greater-than-or-equal',
        showInPickComparison: true,
        variableTypes: [
            variableType.number.key,
        ],
    },
    lessThan: {
        key: 'lessThan',
        code: '<',
        title: 'less than',
        icon: 'mdi mdi-less-than',
        showInPickComparison: true,
        variableTypes: [
            variableType.number.key,
        ],
    },
    lessThanOrEqualTo: {
        key: 'lessThanOrEqualTo',
        code: '<=',
        title: 'less than / equal',
        icon: 'mdi mdi-less-than-or-equal',
        showInPickComparison: true,
        variableTypes: [
            variableType.number.key,
        ],
    },
    assign: {
        key: 'assign',
        code: '=',
        title: 'assign value',
        icon: 'mdi mdi-equal',
        variableTypes: [
            variableType.function.key,
        ]
    },
    in: {
        key: 'in',
        code: 'in',
        title: 'for loop',
        icon: 'mdi mdi-sync',
        variableTypes: [
            variableType.uidObject.key,
        ]
    },
    add: {
        key: 'add',
        display: '+',
        icon: 'mdi mdi-plus',
        color: 'green',
        showInStringView: true,
    },
    subtract: {
        key: 'subtract',
        display: '-',
        icon: 'mdi mdi-minus',
        color: 'red',
        showInStringView: true,
    },
    multiply: {
        key: 'multiply',
        display: '*',
        icon: 'mdi mdi-close',
        color: 'blue',
        showInStringView: true,
    },
    divide: {
        key: 'divide',
        display: '/',
        icon: 'mdi mdi-division',
        color: 'orange',
        showInStringView: true,
    },
    mod: {
        key: 'mod',
        display: '%',
        icon: 'mdi mdi-percent',
        color: 'yellow',
        showInStringView: true,
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

export const logicDNDType = {
    item: 'item',
}