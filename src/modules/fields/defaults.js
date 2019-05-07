import {
    boardType,
    fieldType,
    phaseActionType,
} from '../common/types'
import {
    choiceMap,
    DEFAULT_LOGIC,
} from '../common/defaults'

export const defaultFieldMap = {
    [boardType.roles.key]: [
        'description1',
        'roleTeam',
        'roleImage',
        'playerTags',
        'roleCharges',
        'priority',
        'roleGameChoice',
        'roleTargetMode',
        'roleAction',
    ],
    [boardType.phases.key]: [
        'description2',
        'phaseActionMode',
        'phaseTimer',
        'phaseChoices',
        'phaseAction',
        'phaseListener',
    ],
}


/* @params pageInfo.gameChoices
    FIELD           DESCRIPTION              TYPE
    -----------------------------------------------
    key                                      string
    index                                    number
    title           main label               string
    prompt          short description        string
    gameChoiceType  see gameChoiceType       string
    value           item key                 string                                 
    display         item title               string
*/
export const DEFAULT_GAME_CHOICE = {
    key: '',
    index: '',
    title: '',
    prompt: '',
    gameChoice: '',
    value: '',
    display: '',
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
    default         default value of the field
    vars            any special vars available
    data            data regarding the field
*/
export const defaultFieldRepo = {
    description1: {
        key: 'description1',
        fieldType: fieldType.text.key,
        title: 'Description',
        boardType: boardType.roles.key,
    },
    roleTeam: {
        key: 'roleTeam',
        fieldType: fieldType.uniqueTag.key,
        title: 'Team',
        boardType: boardType.roles.key,
    },
    roleImage: {
        key: 'roleImage',
        fieldType: fieldType.image.key,
        title: "Role Image",
        boardType: boardType.roles.key,
    },
    playerTags: {
        key: 'playerTags',
        fieldType: fieldType.generalTag.key,
        title: 'Player Tags',
        boardType: boardType.roles.key,
    },
    roleCharges: {
        key: 'roleCharges',
        fieldType: fieldType.number.key,
        title: 'Charges',
        boardType: boardType.roles.key,
    },
    priority: {
        key: 'priority',
        fieldType: fieldType.priority.key,
        title: 'Priority',
        boardType: boardType.roles.key,
    },
    roleGameChoice: {
        key: 'roleGameChoice',
        fieldType: fieldType.gameChoiceOverride.key,
        title: 'Game Choice Override',
        boardType: boardType.roles.key,
    },
    roleTargetMode: {
        key: 'roleTargetMode',
        fieldType: fieldType.logic.key,
        title: 'Target Mode',
        vars: choiceMap,
        boardType: boardType.roles.key,
        defaultValue: DEFAULT_LOGIC,
    },
    roleAction: {
        key: 'roleAction',
        fieldType: fieldType.logic.key,
        title: 'Action',
        vars: choiceMap,
        boardType: boardType.roles.key,
        defaultValue: DEFAULT_LOGIC,
    },
    description2: {
        key: 'description2',
        fieldType: fieldType.text.key,
        title: 'Description',
        boardType: boardType.phases.key,
    },
    phaseActionMode: {
        key: 'phaseActionMode',
        fieldType: fieldType.uniqueTag.key,
        title: 'Phase Action Mode',
        boardType: boardType.phases.key,
        data: phaseActionType,
        defaultValue: phaseActionType.all.key,
        readOnly: true,
    },
    phaseTimer: {
        key: 'phaseTimer',
        fieldType: fieldType.timer.key,
        title: 'Phase Timer',
        boardType: boardType.phases.key,
    },
    phaseChoices: {
        key: 'phaseChoices',
        fieldType: fieldType.gameChoices.key,
        title: 'Phase Choices',
        boardType: boardType.phases.key,
    },
    phaseAction: {
        key: 'phaseAction',
        fieldType: fieldType.logic.key,
        title: 'Phase Action',
        boardType: boardType.phases.key,
        defaultValue: DEFAULT_LOGIC,
    },
    phaseListener: {
        key: 'phaseListener',
        fieldType: fieldType.logic.key,
        title: 'Phase Listener',
        boardType: boardType.phases.key,
        defaultValue: DEFAULT_LOGIC,
    },
}