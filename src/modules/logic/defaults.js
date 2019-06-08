import { variableType } from '../common/types'

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

export const triggerNewVars = {
    "(visitor)": {
        key: '(visitor)',
        value: '(visitor)',
        display: 'visitor',
        variableTypes: [
            variableType.uid.key,
        ],
    },
}

export const choiceMap = {
    "(choice)": {
        key: '(choice)',
        value: '(choice)',
        display: 'choice',
        variableTypes: [
            variableType.object.key,
        ],
    },
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
}

export const rssMap = {
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
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(role)': {
        key: '(rss)(players)(@)(role)',
        value: '(rss)(players)(@)(role)',
        display: 'rss.players.@.role',
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(role)(roleId)': {
        key: '(rss)(players)(@)(role)(roleId)',
        value: '(rss)(players)(@)(role)(roleId)',
        display: 'rss.players.@.role.roleId',
        variableTypes: [
            variableType.key.key,
        ],
    },
    '(rss)(players)(@)(role)(roleTeam)': {
        key: '(rss)(players)(@)(role)(roleTeam)',
        value: '(rss)(players)(@)(role)(roleTeam)',
        display: 'rss.players.@.role.roleTeam',
        variableTypes: [
            variableType.string.key,
        ],
    },
    '(rss)(players)(@)(role)(action)': {
        key: '(rss)(players)(@)(role)(action)',
        value: '(rss)(players)(@)(role)(action)',
        display: 'rss.players.@.role.action',
        variableTypes: [
            variableType.function.key,
        ],
    },
    '(rss)(players)(@)(role)(charges)': {
        key: '(rss)(players)(@)(role)(charges)',
        value: '(rss)(players)(@)(role)(charges)',
        display: 'rss.players.@.role.charges',
        variableTypes: [
            variableType.number.key,
        ],
    },
    '(rss)(players)(@)(health)': {
        key: '(rss)(players)(@)(health)',
        value: '(rss)(players)(@)(health)',
        display: 'rss.players.@.health',
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(dead)': {
        key: '(rss)(players)(@)(dead)',
        value: '(rss)(players)(@)(dead)',
        display: 'rss.players.@.dead',
        variableTypes: [
            variableType.boolean.key,
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
    '(rss)(players)(@)(trigger)': {
        key: '(rss)(players)(@)(trigger)',
        value: '(rss)(players)(@)(trigger)',
        display: 'rss.players.@.trigger',
        variableTypes: [
            variableType.object.key,
        ],
    },
    '(rss)(players)(@)(trigger)(@)': {
        key: '(rss)(players)(@)(trigger)(@)',
        value: '(rss)(players)(@)(trigger)(@)',
        display: 'rss.players.@.trigger.@',
        variableTypes: [
            variableType.uid.key,
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
    '(rss)(choices)(@)(ordered)(first)': {
        key: '(rss)(choices)(@)(ordered)(first)',
        value: '(rss)(choices)(@)(ordered)(first)',
        display: 'rss.choices.@.ordered.first',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(second)': {
        key: '(rss)(choices)(@)(ordered)(second)',
        value: '(rss)(choices)(@)(ordered)(second)',
        display: 'rss.choices.@.ordered.second',
        variableTypes: [
            variableType.uid.key,
        ],
    },
    '(rss)(choices)(@)(ordered)(third)': {
        key: '(rss)(choices)(@)(ordered)(third)',
        value: '(rss)(choices)(@)(ordered)(third)',
        display: 'rss.choices.@.ordered.third',
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