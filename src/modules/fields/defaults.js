import {
    DEFAULT_LOGIC,
    choiceMap,
} from '../logic/types'

export const boardType = {
    library: {
        key: 'library',
        title: 'Library',
    },
    functions: {
        key: 'functions',
        title: 'Functions',
    },
    phases: {
        key: 'phases',
        title: 'Phases',
    },
    roles: {
        key: 'roles',
        title: 'Roles',
    },
    events: {
        key: 'events',
        title: 'Events',
    },
}

export const fieldType = {
    call: {
        key: 'call',
        index: -1,
        icon: 'mdi mdi-console',
        title: 'Call',
    },
    text: {
        key: 'text',
        index: 0,
        icon: 'ion-md-list',
        title: 'Text',
    },
    number: {
        key: 'number',
        index: 1,
        icon: 'mdi mdi-numeric',
        title: 'Number',
    },
    image: {
        key: 'image',
        index: 2,
        icon: 'mdi mdi-image',
        title: 'Image',
    },
    logic: {
        key: 'logic',
        index: 3,
        icon: 'mdi mdi-codepen',
        title: 'Logic',
    },
    uniqueTag: {
        key: 'uniqueTag',
        index: 4,
        icon: 'ion-ios-pricetag',
        title: 'Tag',
    },
    vars: {
        key: 'vars',
        index: 5,
        icon: 'ion-md-planet',
        title: 'Vars',
    },
    gameChoices: {
        key: 'gameChoices',
        index: 9,
        icon: 'mdi mdi-map-marker-path',
        title: 'Game Choices',
    },
    generalTag: {
        key: 'generalTag',
        index: 10,
        icon: 'ion-ios-pricetag',
        title: 'Player Tags',
    },
    priority: {
        key: 'priority',
        index: 11,
        icon: 'mdi mdi-priority-high',
        title: 'Priority',
    },
}

export const defaultFieldMap = {
    [boardType.roles.key]: [
        'description1',
        'roleTeam',
        'roleImage',
        'playerTags',
        'roleCharges',
        'priority',
        'roleTargetMode',
        'roleAction',
    ],
    [boardType.phases.key]: [
        'description2',
        'phaseActionMode',
        'phaseChoices',
        'phaseAction',
        'phaseListener',
    ],
}

export const phaseActionType = {
    all: {
        key: 'all',
        title: 'All',
    },
    king: {
        key: 'king',
        title: 'King',
    },
    jester: {
        key: 'jester',
        title: 'Jester',
    },
    none: {
        key: 'none',
        title: 'None',
    },
}

export const gameChoiceType = {
    target: {
        key: 'target',
        title: 'Single Target',
        icon: 'mdi mdi-account',
    },
    multitarget: {
        key: 'multitarget',
        title: 'Multiple Targets',
        icon: 'mdi mdi-account-multiple',
    },
    value: {
        key: 'value',
        title: 'Value',
        icon: 'mdi mdi-tag',
    },
}

/* @params pageInfo.gameChoices
    FIELD           DESCRIPTION              TYPE
    -----------------------------------------------
    key                                      string
    index                                    number
    title           main label               string
    prompt          short description        string
    gameChoiceType  see gameChoiceType       string
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
    roleTargetMode: {
        key: 'roleTargetMode',
        fieldType: fieldType.logic.key,
        title: 'Target Mode',
        vars: choiceMap,
        boardType: boardType.roles.key,
        default: DEFAULT_LOGIC,
    },
    roleAction: {
        key: 'roleAction',
        fieldType: fieldType.logic.key,
        title: 'Action',
        vars: choiceMap,
        boardType: boardType.roles.key,
        default: DEFAULT_LOGIC,
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
        default: phaseActionType.all.key,
        readOnly: true,
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
        default: DEFAULT_LOGIC,
    },
    phaseListener: {
        key: 'phaseListener',
        fieldType: fieldType.logic.key,
        title: 'Phase Listener',
        boardType: boardType.phases.key,
        default: DEFAULT_LOGIC,
    },
}