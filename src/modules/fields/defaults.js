import {
    DEFAULT_LOGIC,
    choiceMap,
} from '../logic/types'

export const boardType = {
    library: {
        key: 'library',
        title: 'Library',
        label: 'Library',
        icon: 'mdi mdi-library-books',
    },
    functions: {
        key: 'functions',
        title: 'Functions',
        label: 'Functions',
        icon: 'mdi mdi-function-variant',
    },
    phases: {
        key: 'phases',
        title: 'Phases',
        label: 'Phases',
        icon: 'mdi mdi-book-open-page-variant',
    },
    roles: {
        key: 'roles',
        title: 'Roles',
        label: 'Roles',
        icon: 'mdi mdi-folder-account',
    },
    events: {
        key: 'events',
        title: 'Events',
        label: 'Events',
        icon: 'mdi mdi-calendar-text',
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
        icon: 'mdi mdi-map-marker-distance',
        title: 'Game Choices',
    },
    gameChoiceOverride: {
        key: 'gameChoiceOverride',
        index: 10,
        icon: 'mdi mdi-map-marker-distance',
        title: 'Game Choice Override',
    },
    generalTag: {
        key: 'generalTag',
        index: 11,
        icon: 'ion-ios-pricetag',
        title: 'Player Tags',
    },
    priority: {
        key: 'priority',
        index: 12,
        icon: 'mdi mdi-priority-high',
        title: 'Priority',
    },
    timer: {
        key: 'timer',
        index: 13,
        icon: 'mdi mdi-timer-sand',
        title: 'Timer',
    }
}

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
    multi: {
        key: 'multi',
        title: 'Multiple Targets',
        icon: 'mdi mdi-account-multiple',
    },
    ordered: {
        key: 'ordered',
        title: 'Ordered Targets',
        icon: 'mdi mdi-sort-numeric',
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