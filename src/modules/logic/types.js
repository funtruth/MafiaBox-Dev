import { dropdownType } from "../common/types";

export const logicType = {
    operator: {
        key: 'operator',
        index: 0,
        title: 'operator',
        icon: 'code-tags',
        color: 'violet',
        dropdown: dropdownType.pickOperator,
    },
    variable: {
        key: 'variable',
        index: 1,
        title: 'variable',
        icon: 'pen',
        color: 'violet',
    },
    function: {
        key: 'function',
        index: 2,
        title: 'function',
        icon: 'function-variant',
        color: 'fb',
    },
    update: {
        key: 'update',
        index: 3,
        title: 'update',
        icon: 'code-braces',
        color: 'pink',
    },
    event: {
        key: 'event',
        index: 4,
        title: 'event',
        icon: 'calendar',
        color: 'fb',
    },
    return: {
        key: 'return',
        index: 5,
        title: 'return',
        icon: 'page-next',
        color: 'green',
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
        logicType: logicType.operator.key,
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
        logicType: logicType.operator.key,
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
        logicType: logicType.operator.key,
    },
    forin: {
        key: 'forin',
        title: 'for',
        value: {
            left: "for(var ",
            right: ")",
        },
        icon: 'sync',
        color: 'orange',
        logicType: logicType.operator.key,
    },
    random: {
        key: 'random',
        title: 'random',
        value: {
            left: "{",
            right: "}",
        },
        icon: 'dice-3',
        color: 'orange',
        logicType: logicType.operator.key,
    }
}

export const parseType = {
    boolean: 'parseType/boolean',
    constant: 'parseType/constant',
    collection: 'parseType/collection',
    declare: 'parseType/declare',
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

export const healthUpdateType = {
    attack1: {
        key: 'attack1',
        index: 0,
        title: 'Basic Attack',
        icon: 'sword',
        code: () => '-1',
    },
    attack2: {
        key: 'attack2',
        index: 1,
        title: 'Strong Attack',
        icon: 'sword',
        code: () => '-2',
    },
    attack3: {
        key: 'attack3',
        index: 2,
        title: 'Superior Attack',
        icon: 'sword',
        code: () => '-100',
    },
    defend1: {
        key: 'defend1',
        index: 3,
        title: 'Basic Defense',
        icon: 'shield-half-full',
        code: () => '1',
    },
    defend2: {
        key: 'defend2',
        index: 4,
        title: 'Strong Defense',
        icon: 'shield',
        code: () => '2',
    },
    defend3: {
        key: 'defend3',
        index: 5,
        title: 'Superior Defense',
        icon: 'shield-plus',
        code: () => '100',
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
        declarable: false,
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
        variableTypes: [
            variableType.function.key,
        ]
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
    add: {
        key: 'add',
        display: '+',
        icon: 'plus',
        color: 'green',
        showInStringView: true,
    },
    subtract: {
        key: 'subtract',
        display: '-',
        icon: 'minus',
        color: 'red',
        showInStringView: true,
    },
    multiply: {
        key: 'multiply',
        display: '*',
        icon: 'close',
        color: 'blue',
        showInStringView: true,
    },
    divide: {
        key: 'divide',
        display: '/',
        icon: 'division',
        color: 'orange',
        showInStringView: true,
    },
    mod: {
        key: 'mod',
        display: '%',
        icon: 'percent',
        color: 'yellow',
        showInStringView: true,
    },
}

export const returnType = {
    true: {
        key: 'true',
        index: 0,
        title: 'true',
        icon: 'checkbox-marked-circle',
    },
    false: {
        key: 'false',
        index: 1,
        title: 'false',
        icon: 'close-circle',
    },
}

export const logicDNDType = {
    item: 'item',
}