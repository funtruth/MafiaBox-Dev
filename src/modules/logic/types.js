import { dropdownType } from "../dropdown/types";
import { mathOperatorType } from "../modal/vars/components/types";

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
        title: 'for',
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

/* @params logicItem
    declare => any new variables
*/
export const DEFAULT_LOGIC = {
    data: "",
    down: "",
    logicType: "",
    operatorType: "",
    right: "",
    declare: "",
}

/* @params logicItem.data
    assign  => see modal/vars/ops for architecture
    display => what to show on the update button / FRONT-END
    static  => unable to be assigned / type cannot be changed
*/
export const VAR_DEFAULTS = {
    assign: "",
    display: "",
    length: false,
    static: false,
    updateType: "",
    value: "",
    variableTypes: "",
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
        declarable: true,
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
        title: 'Unique ID',
        icon: 'mdi mdi-account',
        supertype: '',
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
    function: {
        key: 'function',
        title: 'Function',
        icon: 'mdi mdi-function',
        supertype: '',
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
    "(visitor)": {
        key: '(visitor)',
        variableTypes: [
            variableType.uid.key,
            variableType.string.key,
        ],
    },
}

export const rssMap = {
    '(rss)': {
        key: '(rss)',
        subfield: 'rss',
        fields: [
            'rss',
        ],
        fieldLength: 1,
        dropdown: dropdownType.showSubfields,
        variableTypes: [
            variableType.object,
        ],
    },
    '(rss)(gameState)': {
        key: '(rss)(gameState)',
        subfield: 'gameState',
        fields: [
            'rss',
            'gameState',
        ],
        fieldLength: 2,
        dropdown: dropdownType.showSubfields,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(gameState)(phase)': {
        key: '(rss)(gameState)(phase)',
        subfield: 'phase',
        fields: [
            'rss',
            'gameState',
            'phase',
        ],
        fieldLength: 3,
        dropdown: dropdownType.pickPhase,
        variableTypes: [
            variableType.string.key,
        ],
    },
    '(rss)(gameState)(counter)': {
        key: '(rss)(gameState)(counter)',
        subfield: 'counter',
        fields: [
            'rss',
            'gameState',
            'counter',
        ],
        fieldLength: 3,
        dropdown: dropdownType.pickNumUpdate,
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(gameState)(veto)': {
        key: '(rss)(gameState)(veto)',
        subfield: 'veto',
        fields: [
            'rss',
            'gameState',
            'veto',
        ],
        fieldLength: 3,
        dropdown: dropdownType.pickNumUpdate,
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(gameState)(timer)': {
        key: '(rss)(gameState)(timer)',
        subfield: 'timer',
        fields: [
            'rss',
            'gameState',
            'timer',
        ],
        fieldLength: 3,
        dropdown: dropdownType.pickTimer,
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(lobby)': {
        key: '(rss)(lobby)',
        subfield: 'lobby',
        fields: [
            'rss',
            'lobby',
        ],
        fieldLength: 2,
        dropdown: dropdownType.showUidSubfield,
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    '(rss)(lobby)(@)': {
        key: '(rss)(lobby)(@)',
        subfield: '@',
        fields: [
            'rss',
            'lobby',
            '@',
        ],
        fieldLength: 3,
        dropdown: dropdownType.showSubfields,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(lobby)(@)(role)': {
        key: '(rss)(lobby)(@)(role)',
        subfield: 'role',
        fields: [
            'rss',
            'lobby',
            '@',
            'role',
        ],
        fieldLength: 4,
        dropdown: dropdownType.showRoleSubfields,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(lobby)(@)(role)(roleId)': {
        key: '(rss)(lobby)(@)(role)(roleId)',
        subfield: 'roleId',
        fields: [
            'rss',
            'lobby',
            '@',
            'role',
            'roleId',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickRole,
        variableTypes: [
            variableType.string.key,
        ],
    },
    '(rss)(lobby)(@)(role)(roleTeam)': {
        key: '(rss)(lobby)(@)(role)(roleTeam)',
        subfield: 'roleTeam',
        fields: [
            'rss',
            'lobby',
            '@',
            'role',
            'roleTeam',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickRoleTeam,
        variableTypes: [
            variableType.string.key,
        ],
    },
    '(rss)(lobby)(@)(role)(action)': {
        key: '(rss)(lobby)(@)(role)(action)',
        subfield: 'action',
        fields: [
            'rss',
            'lobby',
            '@',
            'role',
            'action',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickRole,
        variableTypes: [
            variableType.function.key,
        ],
    },
    '(rss)(lobby)(@)(role)(charges)': {
        key: '(rss)(lobby)(@)(role)(charges)',
        subfield: 'charges',
        fields: [
            'rss',
            'lobby',
            '@',
            'role',
            'team',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickNumUpdate,
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(lobby)(@)(health)': {
        key: '(rss)(lobby)(@)(health)',
        subfield: 'health',
        fields: [
            'rss',
            'lobby',
            '@',
            'health',
        ],
        fieldLength: 4,
        dropdown: dropdownType.pickHealth,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(lobby)(@)(dead)': {
        key: '(rss)(lobby)(@)(dead)',
        subfield: 'dead',
        fields: [
            'rss',
            'lobby',
            '@',
            'dead',
        ],
        fieldLength: 4,
        dropdown: dropdownType.pickBoolean,
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(lobby)(@)(king)': {
        key: '(rss)(lobby)(@)(king)',
        subfield: 'king',
        fields: [
            'rss',
            'lobby',
            '@',
            'king',
        ],
        fieldLength: 4,
        dropdown: dropdownType.pickBoolean,
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(lobby)(@)(clown)': {
        key: '(rss)(lobby)(@)(clown)',
        subfield: 'clown',
        fields: [
            'rss',
            'lobby',
            '@',
            'clown',
        ],
        fieldLength: 4,
        dropdown: dropdownType.pickBoolean,
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(lobby)(@)(trigger)': {
        key: '(rss)(lobby)(@)(trigger)',
        subfield: 'trigger',
        fields: [
            'rss',
            'lobby',
            '@',
            'trigger',
        ],
        fieldLength: 4,
        dropdown: dropdownType.showUidSubfield,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(lobby)(@)(trigger)(@)': {
        key: '(rss)(lobby)(@)(trigger)(@)',
        subfield: '@',
        fields: [
            'rss',
            'lobby',
            '@',
            'trigger',
            '@',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickTrigger,
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)': {
        key: '(rss)(choices)',
        subfield: 'choices',
        fields: [
            'rss',
            'choices',
        ],
        fieldLength: 2,
        dropdown: dropdownType.pickUid,
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    '(rss)(choices)(@)': {
        key: '(rss)(choices)(@)',
        subfield: '@',
        fields: [
            'rss',
            'choices',
            '@',
        ],
        fieldLength: 3,
        dropdown: dropdownType.showSubfields,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(choices)(@)(user)': {
        key: '(rss)(choices)(@)(user)',
        subfield: 'user',
        fields: [
            'rss',
            'choices',
            '@',
            'user',
        ],
        fieldLength: 4,
        dropdown: dropdownType.pickUid,
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(target)': {
        key: '(rss)(choices)(@)(target)',
        subfield: 'target',
        fields: [
            'rss',
            'choices',
            '@',
            'target',
        ],
        fieldLength: 4,
        dropdown: dropdownType.pickChoice,
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(multitarget)': {
        key: '(rss)(choices)(@)(multitarget)',
        subfield: 'multitarget',
        fields: [
            'rss',
            'choices',
            '@',
            'multitarget',
        ],
        fieldLength: 4,
        dropdown: dropdownType.pickUid,
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    '(rss)(choices)(@)(multitarget)(@)': {
        key: '(rss)(choices)(@)(multitarget)(@)',
        subfield: '@',
        fields: [
            'rss',
            'choices',
            '@',
            'multitarget',
            '@',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickUid,
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(choices)(@)(value)': {
        key: '(rss)(choices)(@)(value)',
        subfield: 'value',
        fields: [
            'rss',
            'choices',
            '@',
            'value',
        ],
        fieldLength: 4,
        dropdown: dropdownType.pickVar,
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(events)': {
        key: '(rss)(events)',
        subfield: 'events',
        fields: [
            'rss',
            'events',
        ],
        fieldLength: 2,
        dropdown: dropdownType.pickEvent,
        variableTypes: [
            variableType.object.key,
        ],
    },
}