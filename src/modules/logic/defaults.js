import {
    dropdownType,
    variableType,
} from '../common/types'

/* logicItem
    FIELD           DESCRIPTION
    ---------------------------------------------------------------
    key
    byId            keyed repo of all logic of CURRENT logicItem, NOT related to byIndex
    byIndex         list of children under the logicItem, NOT related to byId
    logicType
    operatorType
    source          where the parser should start for CURRENT logicItem
*/
export const DEFAULT_LOGIC = {
    byId: "",
    byIndex: "",
    logicType: "",
    operatorType: "",
    source: "",
}

export const LOGIC_ITEM_DATA_SOURCE = "source"

/* logicItem.byId.[logicKey]
    FIELD           DESCRIPTION
    ---------------------------------------------------------------
    key
    display         what to show on the update button / FRONT-END
    "               config for parseType.collection, boolean => display "add new" panel
    "               config for parseType.object, boolean => display "add new" panel
    disabled        does not allow user to change variable value
    parseBy         parseType, how the LogicEngine should read the data
    value           payload for parseType.string, {byId, byIndex}
    "               payload for parseType.variable, value in (foo)(bar) form
    "               payload for parseType.collection, value is [varKey, varKey...]
    "               payload for parseType.operation, see LOGIC_ITEM_VAR_OPERATION
    "               payload for parseType.wrapper, seeLOGIC_ITEM_VAR_WRAPPER
    "               payload fro parseType.object, value is [varKey, varKey...]
    variableTypes   list of variableTypes
*/
export const LOGIC_ITEM_VAR = {
    display: "",
    disabled: "",
    parseBy: "",
    value: "",
    variableTypes: "",
}

/* logicItem.byId.[logicKey].value
    FIELD           DESCRIPTION
    ---------------------------------------------------------------
    display         REMOVED, included in LOGIC_ITEM_VAR.display
    left            logicKey for left-side
    operator        operator
    right           logicKey for right-side
*/
export const LOGIC_ITEM_VAR_OPERATION = {
    left: "",
    operator: "",
    right: "",
}

/* logicItem.byId.[logicKey].value
    FIELD           DESCRIPTION
    ---------------------------------------------------------------
    middle          logicKey for content
    left            keyed repo
    right           array
*/
export const LOGIC_ITEM_VAR_WRAPPER = {
    left: "",
    middle: "",
    right: "",
}

/* @params variable, this is different from LOGIC_ITEM_VAR as it only pertains to the structure of the variable, not the descriptor for the state of a variable. Examples are done with the object foo.bar
    FIELD           DESCRIPTION              EXAMPLE         TYPE
    ---------------------------------------------------------------
    key             entire variable name,    (foo)(bar)      string
    subfield        last field of variable,  bar             string
    fields          list of fields,          [foo, bar]      array
    fieldLength     length of fields         2               number
    dropdown        connected dropdown menu  dropdownType    string
    variableTypes   list of variableTypes    [string]        array
    declare         if the variable is assigned a value at declaration
*/
export const DEFAULT_VAR_ID = {
    key: '',
    subfield: '',
    fields: '',
    fieldLength: '',
    dropdown: '',
    variableTypes: '',
    declare: '',
}

export const triggerNewVars = {
    "(visitor)": {
        key: '(visitor)',
        subfield: 'visitor',
        fields: [
            'visitor',
        ],
        fieldLength: 1,
        variableTypes: [
            variableType.uid.key,
        ],
    },
}

export const choiceMap = {
    "(choice)": {
        key: '(choice)',
        subfield: 'choice',
        fields: [
            'choice',
        ],
        fieldLength: 1,
        variableTypes: [
            variableType.object.key,
        ],
    },
    "(choice)(user)": {
        key: '(choice)(user)',
        subfield: 'user',
        fields: [
            'choice',
            'user',
        ],
        fieldLength: 2,
        variableTypes: [
            variableType.uid.key,
        ],
    },
    "(choice)(target)": {
        key: '(choice)(target)',
        subfield: 'target',
        fields: [
            'choice',
            'target',
        ],
        fieldLength: 2,
        variableTypes: [
            variableType.uid.key,
        ],
    },
    "(choice)(multi)": {
        key: '(choice)(multi)',
        subfield: 'multi',
        fields: [
            'choice',
            'multi',
        ],
        fieldLength: 2,
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    "(choice)(ordered)": {
        key: '(choice)(ordered)',
        subfield: 'ordered',
        fields: [
            'choice',
            'ordered',
        ],
        fieldLength: 2,
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    "(choice)(value)": {
        key: '(choice)(value)',
        subfield: 'value',
        fields: [
            'choice',
            'value',
        ],
        fieldLength: 2,
        variableTypes: [
            variableType.number.key,
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
        variableTypes: [
            variableType.key.key,
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
        variableTypes: [
            variableType.time.key,
        ],
    },
    '(rss)(gameState)(captain)': {
        key: '(rss)(gameState)(captain)',
        subfield: 'captain',
        fields: [
            'rss',
            'gameState',
            'captain',
        ],
        fieldLength: 3,
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(players)': {
        key: '(rss)(players)',
        subfield: 'players',
        fields: [
            'rss',
            'players',
        ],
        fieldLength: 2,
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    '(rss)(players)(@)': {
        key: '(rss)(players)(@)',
        subfield: '@',
        fields: [
            'rss',
            'players',
            '@',
        ],
        fieldLength: 3,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(role)': {
        key: '(rss)(players)(@)(role)',
        subfield: 'role',
        fields: [
            'rss',
            'players',
            '@',
            'role',
        ],
        fieldLength: 4,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(role)(roleId)': {
        key: '(rss)(players)(@)(role)(roleId)',
        subfield: 'roleId',
        fields: [
            'rss',
            'players',
            '@',
            'role',
            'roleId',
        ],
        fieldLength: 5,
        variableTypes: [
            variableType.string.key,
        ],
    },
    '(rss)(players)(@)(role)(roleTeam)': {
        key: '(rss)(players)(@)(role)(roleTeam)',
        subfield: 'roleTeam',
        fields: [
            'rss',
            'players',
            '@',
            'role',
            'roleTeam',
        ],
        fieldLength: 5,
        variableTypes: [
            variableType.string.key,
        ],
    },
    '(rss)(players)(@)(role)(action)': {
        key: '(rss)(players)(@)(role)(action)',
        subfield: 'action',
        fields: [
            'rss',
            'players',
            '@',
            'role',
            'action',
        ],
        fieldLength: 5,
        variableTypes: [
            variableType.function.key,
        ],
    },
    '(rss)(players)(@)(role)(charges)': {
        key: '(rss)(players)(@)(role)(charges)',
        subfield: 'charges',
        fields: [
            'rss',
            'players',
            '@',
            'role',
            'team',
        ],
        fieldLength: 5,
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(players)(@)(health)': {
        key: '(rss)(players)(@)(health)',
        subfield: 'health',
        fields: [
            'rss',
            'players',
            '@',
            'health',
        ],
        fieldLength: 4,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(dead)': {
        key: '(rss)(players)(@)(dead)',
        subfield: 'dead',
        fields: [
            'rss',
            'players',
            '@',
            'dead',
        ],
        fieldLength: 4,
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(players)(@)(king)': {
        key: '(rss)(players)(@)(king)',
        subfield: 'king',
        fields: [
            'rss',
            'players',
            '@',
            'king',
        ],
        fieldLength: 4,
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(players)(@)(clown)': {
        key: '(rss)(players)(@)(clown)',
        subfield: 'clown',
        fields: [
            'rss',
            'players',
            '@',
            'clown',
        ],
        fieldLength: 4,
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(players)(@)(trigger)': {
        key: '(rss)(players)(@)(trigger)',
        subfield: 'trigger',
        fields: [
            'rss',
            'players',
            '@',
            'trigger',
        ],
        fieldLength: 4,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(trigger)(@)': {
        key: '(rss)(players)(@)(trigger)(@)',
        subfield: '@',
        fields: [
            'rss',
            'players',
            '@',
            'trigger',
            '@',
        ],
        fieldLength: 5,
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
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(multi)': {
        key: '(rss)(choices)(@)(multi)',
        subfield: 'multi',
        fields: [
            'rss',
            'choices',
            '@',
            'multi',
        ],
        fieldLength: 4,
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    '(rss)(choices)(@)(multi)(@)': {
        key: '(rss)(choices)(@)(multi)(@)',
        subfield: '@',
        fields: [
            'rss',
            'choices',
            '@',
            'multi',
            '@',
        ],
        fieldLength: 5,
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(choices)(@)(ordered)': {
        key: '(rss)(choices)(@)(ordered)',
        subfield: 'ordered',
        fields: [
            'rss',
            'choices',
            '@',
            'ordered',
        ],
        fieldLength: 4,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(first)': {
        key: '(rss)(choices)(@)(ordered)(first)',
        subfield: 'first',
        fields: [
            'rss',
            'choices',
            '@',
            'ordered',
            'first',
        ],
        fieldLength: 5,
        variableTypes: [
            variableType.uid.key,
            variableType.key.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(second)': {
        key: '(rss)(choices)(@)(ordered)(second)',
        subfield: 'second',
        fields: [
            'rss',
            'choices',
            '@',
            'ordered',
            'second',
        ],
        fieldLength: 5,
        variableTypes: [
            variableType.uid.key,
            variableType.key.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(third)': {
        key: '(rss)(choices)(@)(ordered)(third)',
        subfield: 'third',
        fields: [
            'rss',
            'choices',
            '@',
            'ordered',
            'third',
        ],
        fieldLength: 5,
        variableTypes: [
            variableType.uid.key,
            variableType.key.key,
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
        variableTypes: [
            variableType.global.key,
        ],
    },
}