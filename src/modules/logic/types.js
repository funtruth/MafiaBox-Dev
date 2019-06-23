import { dropdownType } from "../common/types";

export const logicType = {
    operator: {
        key: 'operator',
        index: 0,
        title: 'operator',
        icon: 'code-tags',
        color: 'violet',
        dropdown: dropdownType.pickOperator,
        hideDeclared: true,
    },
    variable: {
        key: 'variable',
        index: 1,
        title: 'variable',
        icon: 'pen',
        color: 'violet',
    },
    return: {
        key: 'return',
        index: 2,
        title: 'return',
        icon: 'page-next',
        color: 'green',
        dropdown: dropdownType.pickReturn,
    },
    function: {
        key: 'function',
        index: 3,
        title: 'function',
        icon: 'function-variant',
        color: 'fb',
    },
    update: {
        key: 'update',
        index: 4,
        title: 'update',
        icon: 'code-braces',
        color: 'pink',
    },
    event: {
        key: 'event',
        index: 5,
        title: 'event',
        icon: 'calendar',
        color: 'fb',
    },
    random: {
        key: 'random',
        index: 6,
        title: 'random',
        icon: 'dice-3',
        color: 'orange',
        hideDeclared: true,
    },
}

export const operatorType = {
    if: {
        key: 'if',
        title: 'if',
        value: {
            left: "if(",
            right: ")",
        },
        icon: 'ray-start-arrow',
        color: 'yellow',
        logic: logicType.operator.key,
    },
    else: {
        key: 'else',
        title: 'else',
        value: {
            left: "else",
            right: "",
        },
        icon: 'redo-variant',
        color: 'red',
        logic: logicType.operator.key,
    },
    elseif: {
        key: 'elseif',
        title: 'else if',
        value: {
            left: "else if(",
            right: ")",
        },
        icon: 'swap-horizontal-variant',
        color: 'fb',
        logic: logicType.operator.key,
    },
    forin: {
        key: 'forin',
        title: 'for',
        value: {
            left: "for(",
            right: ")",
        },
        icon: 'sync',
        color: 'orange',
        logic: logicType.operator.key,
    },
    boolean: {
        key: 'boolean',
        title: 'boolean',
        icon: 'ray-start-arrow',
        color: 'fb',
        logic: logicType.return.key,
    },
    number: {
        key: 'number',
        title: 'number',
        icon: 'redo-variant',
        color: 'fb',
        logic: logicType.return.key,
    },
    string: {
        key: 'string',
        title: 'string',
        icon: 'redo-variant',
        color: 'fb',
        logic: logicType.return.key,
    },
    message: {
        key: 'message',
        title: 'message',
        icon: 'swap-horizontal-variant',
        color: 'fb',
        logic: logicType.return.key,
    }
}

export const parseType = {
    boolean: 'parseType/boolean',
    constant: 'parseType/constant',
    collection: 'parseType/collection',
    declare: 'parseType/declare',
    function: 'parseType/function',
    object: 'parseType/object',
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
        icon: 'code-tags-check',
    },
    false: {
        key: 'false',
        index: 1,
        title: 'false',
        icon: 'close-box-outline',
    },
}

export const variableType = {
    number: {
        key: 'number',
        title: 'Number',
        icon: 'numeric',
        supertype: '',
        declarable: true,
        parseBy: parseType.number,
    },
    string: {
        key: 'string',
        title: 'String',
        icon: 'alpha-s-circle-outline',
        supertype: '',
        declarable: true,
    },
    boolean: {
        key: 'boolean',
        title: 'Boolean',
        icon: 'toggle-switch',
        supertype: '',
        declarable: true,
        parseBy: parseType.variable,
    },
    uid: {
        key: 'uid',
        title: 'Player ID',
        icon: 'account',
        supertype: 'key',
        declarable: true,
        parseBy: parseType.variable,
    },
    object: {
        key: 'object',
        title: 'Object',
        icon: 'code-braces',
        supertype: '',
        declarable: false,
    },
    uidObject: {
        key: 'uidObject',
        title: 'UID Object',
        icon: 'code-braces',
        supertype: 'object',
        declarable: false,
    },
    function: {
        key: 'function',
        title: 'Function',
        icon: 'function',
        supertype: '',
        declarable: false,
    },
    global: {
        key: 'global',
        title: 'Global',
        icon: 'earth',
        supertype: '',
        declarable: false,
    },
    key: {
        key: 'key',
        title: 'Key',
        icon: 'key-variant',
        supertype: '',
        declarable: false,
    },
    time: {
        key: 'time',
        title: 'Timer',
        icon: 'timer-sand',
        supertype: '',
        declarable: false,
    }
}

export const comparisonType = {
    equal: {
        key: 'equal',
        code: '===',
        title: 'equal',
        icon: 'equal',
        showInPickComparison: true,
    },
    notEqual: {
        key: 'notEqual',
        code: '!==',
        title: 'not equal',
        icon: 'not-equal',
        showInPickComparison: true,
    },
    greaterThan: {
        key: 'greaterThan',
        code: '>',
        title: 'greater than',
        icon: 'greater-than',
        showInPickComparison: true,
        variableTypes: [
            variableType.number.key,
        ],
    },
    greaterThanOrEqualTo: {
        key: 'greaterThanOrEqualTo',
        code: '>=',
        title: 'greater than / equal',
        icon: 'greater-than-or-equal',
        showInPickComparison: true,
        variableTypes: [
            variableType.number.key,
        ],
    },
    lessThan: {
        key: 'lessThan',
        code: '<',
        title: 'less than',
        icon: 'less-than',
        showInPickComparison: true,
        variableTypes: [
            variableType.number.key,
        ],
    },
    lessThanOrEqualTo: {
        key: 'lessThanOrEqualTo',
        code: '<=',
        title: 'less than / equal',
        icon: 'less-than-or-equal',
        showInPickComparison: true,
        variableTypes: [
            variableType.number.key,
        ],
    },
    exists: {
        key: 'exists',
        code: '',
        title: 'exists',
        icon: 'lifebuoy',
    },
    assign: {
        key: 'assign',
        code: '=',
        title: 'assign value',
        icon: 'equal',
    },
    in: {
        key: 'in',
        code: ' in ',
        title: 'for loop',
        icon: 'sync',
        variableTypes: [
            variableType.uidObject.key,
        ]
    },
    ":": {
        key: ":",
        code: ':',
        title: ':',
        icon: 'code-braces',
        variableTypes: [
            variableType.object.key,
        ]
    },
    "()": {
        key: "()",
        code: "()",
        title: "()",
        icon: 'code-parentheses',
    },
    add: {
        key: 'add',
        display: '+',
        icon: 'plus',
        color: 'green',
        showInNumberView: true,
    },
    subtract: {
        key: 'subtract',
        display: '-',
        icon: 'minus',
        color: 'red',
        showInNumberView: true,
    },
    multiply: {
        key: 'multiply',
        display: '*',
        icon: 'close',
        color: 'blue',
        showInNumberView: true,
    },
    divide: {
        key: 'divide',
        display: '/',
        icon: 'division',
        color: 'orange',
        showInNumberView: true,
    },
    mod: {
        key: 'mod',
        display: '%',
        icon: 'percent',
        color: 'yellow',
        showInNumberView: true,
    },
}

export const logicDNDType = {
    item: 'item',
}