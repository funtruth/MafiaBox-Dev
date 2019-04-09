import { dropdownType } from "../dropdown/types";

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
    return: {
        key: 'return',
        index: 4,
        title: 'return',
        icon: 'mdi mdi-page-next',
        color: '#1e9939',
    },
}

//helps us process the LogicPanel string
export const panelType = {
    page: {
        key: 'page',
    },
    var: {
        key: 'var',
    },
}

export const operatorType = {
    if: {
        key: 'if',
        index: 0,
        title: 'if',
        icon: 'mdi mdi-ray-start-arrow',
        color: '#af8c40',
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
        title: 'for ... in',
        icon: 'mdi mdi-sync',
        color: '#f9812a',
        logicType: logicType.operator.key,
    },
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
    },
    greaterThanOrEqualTo: {
        key: 'greaterThanOrEqualTo',
        code: '>=',
        title: 'greater than / equal',
        icon: 'mdi mdi-greater-than-or-equal',
    },
    lessThan: {
        key: 'lessThan',
        code: '<',
        title: 'less than',
        icon: 'mdi mdi-less-than',
    },
    lessThanOrEqualTo: {
        key: 'lessThanOrEqualTo',
        code: '<=',
        title: 'less than / equal',
        icon: 'mdi mdi-less-than-or-equal',
    },
}

/*used to get value for UpdateButton TODO remove
    this is separate from variableType because in an UpdateButton view
    there are multiple possible strings to be shown, such as the difference
    between "increment" and "increment by 2"
*/
export const updateViewType = {
    number: 'updateViewType/number',
    variable: 'updateViewType/variable',
    staticVal: 'updateViewType/staticVal',
    dynamicVal: 'updateViewType/dynamicVal',
    page: 'updateViewType/page',
    uid: 'updateViewType/uid',
    health: 'updateViewType/health',
    trigger: 'updateViewType/trigger',
    events: 'updateViewType/events',
    timer: 'updateViewType/timer',
    boolean: 'updateViewType/boolean',
}

//@param showInput for dynamic values
export const numUpdateType = {
    setTo: {
        key: 'setTo',
        index: 1,
        title: 'set to',
        icon: 'mdi mdi-numeric',
        showInput: true,
    },
    incr: {
        key: 'incr',
        index: 2,
        title: 'increment',
        icon: 'mdi mdi-numeric-1-box',
    },
    incrBy: {
        key: 'incrBy',
        index: 3,
        title: 'increment by',
        icon: 'mdi mdi-alpha-n-box',
        showInput: true,
    },
    decr: {
        key: 'decr',
        index: 4,
        title: 'decrement',
        icon: 'ion-md-arrow-round-down',
    },
    decrBy: {
        key: 'decrBy',
        index: 5,
        title: 'decrement by',
        icon: 'ion-md-download',
        showInput: true,
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
        label: ['mdi mdi-sword'],
        icon: 'mdi mdi-sword',
        updateViewType: updateViewType.health,
        code: () => '-1',
    },
    attack2: {
        key: 'attack2',
        index: 1,
        title: 'Strong Attack',
        label: ['mdi mdi-sword', 'mdi mdi-sword'],
        icon: 'mdi mdi-sword',
        updateViewType: updateViewType.health,
        code: () => '-2',
    },
    attack3: {
        key: 'attack3',
        index: 2,
        title: 'Superior Attack',
        label: ['mdi mdi-sword', 'mdi mdi-sword', 'mdi mdi-sword'],
        icon: 'mdi mdi-sword',
        updateViewType: updateViewType.health,
        code: () => '-100',
    },
    defend1: {
        key: 'defend1',
        index: 3,
        title: 'Basic Defense',
        label: ['mdi mdi-shield-half-full'],
        icon: 'mdi mdi-shield-half-full',
        updateViewType: updateViewType.health,
        code: () => '1',
    },
    defend2: {
        key: 'defend2',
        index: 4,
        title: 'Strong Defense',
        label: ['mdi mdi-shield-half-full', 'mdi mdi-shield-half-full'],
        icon: 'mdi mdi-shield',
        updateViewType: updateViewType.health,
        code: () => '2',
    },
    defend3: {
        key: 'defend3',
        index: 5,
        title: 'Superior Defense',
        label: ['mdi mdi-shield-half-full', 'mdi mdi-shield-half-full', 'mdi mdi-shield-half-full'],
        icon: 'mdi mdi-shield-plus',
        updateViewType: updateViewType.health,
        code: () => '100',
    },
}

/* @params logicItem
*/
export const DEFAULT_LOGIC = {
    logicType: "",
    operatorType: "",
    data: "",
    right: "",
    down: "",
}

/* @params logicItem.data
    declare     => if the data in the logic item shows there are new variable(s)
    code        => direct value from code
    display     => what to show on the update button / FRONT-END
*/
export const VAR_DEFAULTS = {
    adjust: "",
    code: "",
    declare: "",
    display: "",
    length: false,
    mutate: false,
    update: false,
    value: "",
    variableTypes: "",
}

export const variableType = {
    number: {
        key: 'number',
        title: 'Number',
        icon: 'mdi mdi-numeric',
        subtype: '',
        declarable: true,
    },
    string: {
        key: 'string',
        title: 'String',
        icon: 'mdi mdi-alpha-s-circle-outline',
        subtype: '',
        declarable: true,
    },
    boolean: {
        key: 'boolean',
        title: 'Boolean',
        icon: 'mdi mdi-toggle-switch',
        subtype: '',
        declarable: true,
    },
    uid: {
        key: 'uid',
        title: 'Unique ID',
        icon: 'mdi mdi-account',
        subtype: 'string',
        declarable: true,
    },
    object: {
        key: 'object',
        title: 'Object',
        icon: 'mdi mdi-code-braces',
        subtype: '',
        declarable: false,
    },
    uidObject: {
        key: 'uidObject',
        title: 'UID Object',
        icon: 'mdi mdi-code-braces',
        subtype: 'object',
        declarable: false,
    },
    rss: {
        key: 'rss',
        title: 'Room Info',
        icon: 'mdi mdi-film',
        subtype: 'object',
        declarable: false,
    },
    rssObject: {
        key: 'rssObject',
        title: 'Room Snapshot',
        icon: 'mdi mdi-film',
        subtype: 'object',
        declarable: false,
    },
    function: {
        key: 'function',
        title: 'Function',
        icon: 'mdi mdi-function',
        subtype: '',
        declarable: false,
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

export const triggerNewVars = {
    "$visitor": {
        key: '$visitor',
        variableTypes: [
            variableType.uid.key,
            variableType.string.key,
        ],
    },
}