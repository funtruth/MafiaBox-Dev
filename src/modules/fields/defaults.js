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
    property: {
        key: 'property',
        index: 6,
        icon: 'ion-md-switch',
        title: 'Property',
    },
    choices: {
        key: 'choices',
        index: 9,
        icon: 'mdi mdi-source-branch',
        title: 'Choices',
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
        'phaseChoices',
        'phaseListener',
    ],
}

export const defaultFieldRepo = {
    description1: {
        key: 'description1',
        fieldType: fieldType.text.key,
        title: 'Description',
        boardType: boardType.roles.key,
    },
    description2: {
        key: 'description2',
        fieldType: fieldType.text.key,
        title: 'Description',
        boardType: boardType.phases.key,
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
    phaseChoices: {
        key: 'phaseChoices',
        fieldType: fieldType.choices.key,
        title: 'Phase Choices',
        boardType: boardType.phases.key,
    },
    phaseListener: {
        key: 'phaseListener',
        fieldType: fieldType.logic.key,
        title: 'Phase Listener',
        boardType: boardType.phases.key,
        default: DEFAULT_LOGIC,
    },
}