import {
    boardType,
    fieldType,
    phaseActionType,
} from '../common/types'
import { choiceMap, choiceMapUID } from '../logic/defaults'

export const defaultFieldMap = {
    [boardType.roles.key]: [
        'description',
        'roleTeam',
        'roleImage',
        'playerTags',
        'roleHealth',
        'roleCharges',
        'priority',
        'roleGameChoice',
        'roleTargetMode',
        'roleAction',
    ],
    [boardType.phases.key]: [
        'description',
        'phaseActionMode',
        'phaseTimer',
        'phaseChoices',
        'phaseAction',
        'phaseListener',
    ],
    [boardType.events.key]: [
        'eventLogic',
    ]
}


/* @params pageInfo.gameChoices
    FIELD           DESCRIPTION             TYPE
    ----------------------------------------------
    key                                     string
    index                                   number
    title           main label              string
    prompt          short description       string
    gameChoiceType  see gameChoiceType      string
    value
    "               gameChoice.value        global
    "               gameChoice.target       uid
    "               gameChoice.multi        uidObject
    "               gameChoice.ordered      object
*/
export const DEFAULT_GAME_CHOICE = {
    key: '',
    index: '',
    title: '',
    prompt: '',
    gameChoice: '',
    value: '',
}

/* @params fieldInfo
    FIELD           DESCRIPTION 
    -----------------------------------------------
    key           
    title           
    fieldType       see fieldType  
    title           
    boardType
    readOnly        field data is not changeable
    defaultValue    default value of the field
    data            data regarding the field
*/
export const defaultFieldRepo = {
    description: {
        key: 'description',
        type: fieldType.text.key,
        title: 'Description',
    },
    roleTeam: {
        key: 'roleTeam',
        type: fieldType.uniqueTag.key,
        title: 'Team',
    },
    roleImage: {
        key: 'roleImage',
        type: fieldType.image.key,
        title: "Role Image",
    },
    playerTags: {
        key: 'playerTags',
        type: fieldType.generalTag.key,
        title: 'Player Tags',
    },
    roleCharges: {
        key: 'roleCharges',
        type: fieldType.number.key,
        title: 'Charges',
        defaultValue: 0,
    },
    priority: {
        key: 'priority',
        type: fieldType.priority.key,
        title: 'Priority',
    },
    roleGameChoice: {
        key: 'roleGameChoice',
        type: fieldType.gameChoiceOverride.key,
        title: 'Game Choice Override',
    },
    roleTargetMode: {
        key: 'roleTargetMode',
        type: fieldType.logic.key,
        title: 'Target Mode',
        defaultValue: { vars: choiceMap },
    },
    roleAction: {
        key: 'roleAction',
        type: fieldType.logic.key,
        title: 'Action',
        defaultValue: { vars: choiceMapUID },
    },
    roleHealth: {
        key: 'roleHealth',
        type: fieldType.number.key,
        title: 'Health',
        defaultValue: 0,
    },
    phaseActionMode: {
        key: 'phaseActionMode',
        type: fieldType.uniqueTag.key,
        title: 'Phase Action Mode',
        data: phaseActionType,
        defaultValue: phaseActionType.all.key,
        readOnly: true,
    },
    phaseTimer: {
        key: 'phaseTimer',
        type: fieldType.timer.key,
        title: 'Phase Timer',
    },
    phaseChoices: {
        key: 'phaseChoices',
        type: fieldType.gameChoices.key,
        title: 'Phase Choices',
    },
    phaseAction: {
        key: 'phaseAction',
        type: fieldType.logic.key,
        title: 'Phase Action',
        defaultValue: { vars: choiceMap },
    },
    phaseListener: {
        key: 'phaseListener',
        type: fieldType.logic.key,
        title: 'Phase Listener',
    },
    eventLogic: {
        key: 'eventLogic',
        type: fieldType.logic.key,
        title: 'Event Logic',
    },
}