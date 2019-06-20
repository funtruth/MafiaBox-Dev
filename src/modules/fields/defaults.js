import {
    boardType,
    fieldType,
    phaseActionType,
} from '../common/types'

export const defaultFieldMap = {
    [boardType.roles.key]: [
        'description',
        'roleSecrets',
        'roleTeam',
        'roleImage',
        'playerTags',
        'roleHealth',
        'roleCharges',
        'priority',
        'roleGameChoice',
        'roleAction',
    ],
    [boardType.phases.key]: [
        'description',
        'phaseActionMode',
        'phaseTimer',
        'phaseChoices',
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
    type            see gameChoiceType      string
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
    type: '',
    value: '',
    logic: '',
    phase: '',
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
    key: {
        key: 'key',
    },
    title: {
        key: 'title',
    },
    description: {
        key: 'description',
        type: fieldType.text.key,
        title: 'Description',
    },
    roleSecrets: {
        key: 'roleSecrets',
        type: fieldType.string.key,
        title: 'Role Secrets',
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
        type: fieldType.number.key,
        title: 'Priority',
        defaultValue: 0,
    },
    roleGameChoice: {
        key: 'roleGameChoice',
        type: fieldType.gameChoiceOverride.key,
        title: 'Game Choice Override',
    },
    roleAction: {
        key: 'roleAction',
        type: fieldType.logic.key,
        title: 'Action',
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