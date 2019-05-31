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
    key: "",
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
    parseBy         parseType, how the LogicEngine should read the data
    value           payload for parseType.string, {byId, byIndex}
                    payload for parseType.variable, value in (foo)(bar) form
                    payload for parseType.collection, value is []
                    payload for parseType.operation, see LOGIC_ITEM_VAR_OPERATION
                    payload for parseType.wrapper, seeLOGIC_ITEM_VAR_WRAPPER
    variableTypes   list of variableTypes
    wildcardValue   original value if originally a wildcard var
*/
export const LOGIC_ITEM_VAR = {
    key: "",
    display: "",
    parseBy: "",
    value: "",
    variableTypes: "",
    wildcardValue: "",
}

/* logicItem.byId.[logicKey].value
    FIELD           DESCRIPTION
    ---------------------------------------------------------------
    display         what to show for operator FRONT-END
    left            logicKey for left-side
    operator        operator
    right           logicKey for right-side
*/
export const LOGIC_ITEM_VAR_OPERATION = {
    display: "",
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

/* DEPRECATED @params logicItem.data
    FIELD           DESCRIPTION
    ---------------------------------------------------------------
    assign          DEPRECATED, moving to operation
    display         what to show on the update button / FRONT-END
    operation       TODO
    parseBy         parseType, how the LogicEngine should read the data
    string          string object {byId, byIndex}
    updateType      DEPRECATED, moving to parse
    value           variable value in (foo)(bar) form
    variableTypes   list of variableTypes
    wildcardValue   original value if originally a wildcard var
*/
export const VAR_DEFAULTS = {
    assign: "",
    display: "",
    parse: "",
    string: "",
    updateType: "",
    value: "",
    variableTypes: "",
    wildcardValue: "",
}

/* @params variable, this is different from VAR_DEFAULTS as it only pertains to the structure of the variable, not the descriptor for the state of a variable. Examples are done with the object foo.bar
    FIELD           DESCRIPTION              EXAMPLE         TYPE
    ---------------------------------------------------------------
    key             entire variable name,    (foo)(bar)      string
    subfield        last field of variable,  bar             string
    fields          list of fields,          [foo, bar]      array
    fieldLength     length of fields         2               number
    dropdown        connected dropdown menu  dropdownType    string
    variableTypes   list of variableTypes    [string]        array
    assign          if the variable is assigned at declaration
*/
export const DEFAULT_VAR_ID = {
    key: '',
    subfield: '',
    fields: '',
    fieldLength: '',
    dropdown: '',
    variableTypes: '',
    assign: '',
}

/* DEPRECATED @params logicItem.data.assign.byId.mathKey
    logicItem.data.assign = {
        byId: "",
        source: "",
    }

    mathType => is this a value (value)? or an operation (value)(operator)(value)
    mathOperator => just the mathematical operator (+-/*%)
*/
export const DEFAULT_ASSIGN = {
    key: "",
    math: "",
    mathOperator: "",
    value: "",
    left: "",
    right: "",
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
        dropdown: dropdownType.showSubfields,
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
        dropdown: dropdownType.showSubfields,
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
        dropdown: dropdownType.showSubfields,
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
        dropdown: dropdownType.showSubfields,
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
        dropdown: dropdownType.showSubfields,
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
        dropdown: dropdownType.showSubfields,
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
            variableType.time.key,
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
        dropdown: dropdownType.pickUid,
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
        dropdown: dropdownType.pickBoolean,
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
        dropdown: dropdownType.showSubfields,
        variableTypes: [
            variableType.array.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(0)': {
        key: '(rss)(choices)(@)(ordered)(0)',
        subfield: '0',
        fields: [
            'rss',
            'choices',
            '@',
            'ordered',
            '0',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickUid,
        variableTypes: [
            variableType.uid.key,
            variableType.key.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(1)': {
        key: '(rss)(choices)(@)(ordered)(1)',
        subfield: '1',
        fields: [
            'rss',
            'choices',
            '@',
            'ordered',
            '1',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickUid,
        variableTypes: [
            variableType.uid.key,
            variableType.key.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(2)': {
        key: '(rss)(choices)(@)(ordered)(2)',
        subfield: '2',
        fields: [
            'rss',
            'choices',
            '@',
            'ordered',
            '2',
        ],
        fieldLength: 5,
        dropdown: dropdownType.pickUid,
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
        dropdown: dropdownType.pickGlobalValue,
        variableTypes: [
            variableType.global.key,
        ],
    },
}