import { variableType, dropdownType } from '../common/types'

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
    "               payload for parseType.declare, value in (foo)(bar) form
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
    typingDisabled  allows variable selection of different types in parseType.operation
    right           logicKey for right-side
*/
export const LOGIC_ITEM_VAR_OPERATION = {
    left: "",
    operator: "",
    typingDisabled: false,
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

/* very similar to LOGIC_ITEM_VAR, but declared with a scope (available to perform logic with ONCE it has been declared)
    FIELD           DESCRIPTION
    ---------------------------------------------------------------
    key
    declare         if the variable is assigned a value at declaration
    display         variable name in front end foo.bar form
    scope           the logicKey where variable was declared
    value           variable name in (foo)(bar) form
    variableTypes   list of variableTypes
*/
export const VAR_WITH_SCOPE = {
    declare: "",
    display: "",
    scope: "",
    value: "",
    variableTypes: "",
}

export const rssMap = {
    "(choice)(user)": {
        key: '(choice)(user)',
        value: '(choice)(user)',
        display: 'choice.user',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    "(choice)(target)": {
        key: '(choice)(target)',
        value: '(choice)(target)',
        display: 'choice.target',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    "(choice)(multi)": {
        key: '(choice)(multi)',
        value: '(choice)(multi)',
        display: 'choice.multi',
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    "(choice)(ordered)": {
        key: '(choice)(ordered)',
        value: '(choice)(ordered)',
        display: 'choice.ordered',
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    "(choice)(value)": {
        key: '(choice)(value)',
        value: '(choice)(value)',
        display: 'choice.value',
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(gameState)': {
        key: '(rss)(gameState)',
        value: '(rss)(gameState)',
        display: 'rss.gameState',
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(gameState)(phase)': {
        key: '(rss)(gameState)(phase)',
        value: '(rss)(gameState)(phase)',
        display: 'rss.gameState.phase',
        variableTypes: [
            variableType.key.key,
        ],
    },
    '(rss)(gameState)(counter)': {
        key: '(rss)(gameState)(counter)',
        value: '(rss)(gameState)(counter)',
        display: 'rss.gameState.counter',
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(gameState)(veto)': {
        key: '(rss)(gameState)(veto)',
        value: '(rss)(gameState)(veto)',
        display: 'rss.gameState.veto',
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(gameState)(timer)': {
        key: '(rss)(gameState)(timer)',
        value: '(rss)(gameState)(timer)',
        display: 'rss.gameState.timer',
        variableTypes: [
            variableType.time.key,
        ],
    },
    '(rss)(gameState)(captain)': {
        key: '(rss)(gameState)(captain)',
        value: '(rss)(gameState)(captain)',
        display: 'rss.gameState.captain',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(players)': {
        key: '(rss)(players)',
        value: '(rss)(players)',
        display: 'rss.players',
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    '(rss)(players)(@)': {
        key: '(rss)(players)(@)',
        value: '(rss)(players)(@)',
        display: 'rss.players.@',
        dropdown: dropdownType.pickVarTags,
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(name)': {
        key: '(rss)(players)(@)(name)',
        value: '(rss)(players)(@)(name)',
        display: 'rss.players.@.name',
        variableTypes: [
            variableType.string.key,
        ],
    },
    '(rss)(players)(@)(roleTeam)': {
        key: '(rss)(players)(@)(roleTeam)',
        value: '(rss)(players)(@)(roleTeam)',
        display: 'rss.players.@.roleTeam',
        variableTypes: [
            variableType.string.key,
        ],
    },
    '(rss)(players)(@)(roleAction)': {
        key: '(rss)(players)(@)(roleAction)',
        value: '(rss)(players)(@)(roleAction)',
        display: 'rss.players.@.roleAction',
        variableTypes: [
            variableType.function.key,
        ],
    },
    '(rss)(players)(@)(roleCharges)': {
        key: '(rss)(players)(@)(roleCharges)',
        value: '(rss)(players)(@)(roleCharges)',
        display: 'rss.players.@.roleCharges',
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(players)(@)(roleHealth)': {
        key: '(rss)(players)(@)(roleHealth)',
        value: '(rss)(players)(@)(roleHealth)',
        display: 'rss.players.@.roleHealth',
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(players)(@)(king)': {
        key: '(rss)(players)(@)(king)',
        value: '(rss)(players)(@)(king)',
        display: 'rss.players.@.king',
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(players)(@)(clown)': {
        key: '(rss)(players)(@)(clown)',
        value: '(rss)(players)(@)(clown)',
        display: 'rss.players.@.clown',
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(choices)': {
        key: '(rss)(choices)',
        value: '(rss)(choices)',
        display: 'rss.choices',
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    '(rss)(choices)(@)': {
        key: '(rss)(choices)(@)',
        value: '(rss)(choices)(@)',
        display: 'rss.choices.@',
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(choices)(@)(user)': {
        key: '(rss)(choices)(@)(user)',
        value: '(rss)(choices)(@)(user)',
        display: 'rss.choices.@.user',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(target)': {
        key: '(rss)(choices)(@)(target)',
        value: '(rss)(choices)(@)(target)',
        display: 'rss.choices.@.target',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(multi)': {
        key: '(rss)(choices)(@)(multi)',
        value: '(rss)(choices)(@)(multi)',
        display: 'rss.choices.@.multi',
        variableTypes: [
            variableType.object.key,
            variableType.uidObject.key,
        ],
    },
    '(rss)(choices)(@)(multi)(@)': {
        key: '(rss)(choices)(@)(multi)(@)',
        value: '(rss)(choices)(@)(multi)(@)',
        display: 'rss.choices.@.multi.@',
        variableTypes: [
            variableType.boolean.key,
        ],
    },
    '(rss)(choices)(@)(ordered)': {
        key: '(rss)(choices)(@)(ordered)',
        value: '(rss)(choices)(@)(ordered)',
        display: 'rss.choices.@.ordered',
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(0)': {
        key: '(rss)(choices)(@)(ordered)(0)',
        value: '(rss)(choices)(@)(ordered)(0)',
        display: 'rss.choices.@.ordered.0',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(1)': {
        key: '(rss)(choices)(@)(ordered)(1)',
        value: '(rss)(choices)(@)(ordered)(1)',
        display: 'rss.choices.@.ordered.1',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(2)': {
        key: '(rss)(choices)(@)(ordered)(2)',
        value: '(rss)(choices)(@)(ordered)(2)',
        display: 'rss.choices.@.ordered.2',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(value)': {
        key: '(rss)(choices)(@)(value)',
        value: '(rss)(choices)(@)(value)',
        display: 'rss.choices.@.value',
        variableTypes: [
            variableType.global.key,
        ],
    },
}