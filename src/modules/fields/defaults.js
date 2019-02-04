import { variableType, defaultLogic } from '../logic/types'

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
    logic: {
        key: 'logic',
        index: 3,
        icon: 'mdi mdi-codepen',
        title: 'Logic',
    },
    tag: {
        key: 'tag',
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
    expertTag: {
        key: 'expertTag',
        index: 7,
        icon: 'ion-ios-pricetags',
        title: 'Expert Tag',
    },
    choices: {
        key: 'choices',
        index: 9,
        icon: 'mdi mdi-source-branch',
        title: 'Choices',
    },
    playerTag: {
        key: 'playerTag',
        index: 10,
        icon: 'ion-ios-pricetag',
        title: 'Player Tags',
        readOnly: true,
    },
    priority: {
        key: 'priority',
        index: 11,
        icon: 'mdi mdi-priority-high',
        title: 'Priority',
        readOnly: true,
    },
}

export const initFieldRepo = {
    functionCall: {
        key: 'functionCall',
        index: 0,
        fieldType: fieldType.call.key,
        title: 'Function name',
        boardType: boardType.functions.key,
    },
    description0: {
        key: 'description0',
        index: 0,
        fieldType: fieldType.text.key,
        title: 'Description',
        boardType: boardType.functions.key,
    },
    description1: {
        key: 'description1',
        index: 0,
        fieldType: fieldType.text.key,
        title: 'Description',
        boardType: boardType.roles.key,
    },
    description2: {
        key: 'description2',
        index: 0,
        fieldType: fieldType.text.key,
        title: 'Description',
        boardType: boardType.phases.key,
    },
    args: {
        key: 'args',
        index: 1,
        fieldType: fieldType.vars.key,
        title: 'Required Variables',
        boardType: boardType.functions.key,
    },
    vars: {
        key: 'vars',
        index: 2,
        fieldType: fieldType.vars.key,
        title: 'Declared Variables',
        boardType: boardType.functions.key,
    },
    code: {
        key: 'code',
        index: 3,
        fieldType: fieldType.logic.key,
        title: 'Code Interpretation',
        boardType: boardType.functions.key,
        default: defaultLogic,
    },
    roleTeam: {
        key: 'roleTeam',
        index: 1,
        fieldType: fieldType.tag.key,
        title: 'Team',
        data: {
            town: {
                key: 'town',
                index: 0,
                title: 'Town',
            },
            mafia: {
                key: 'mafia',
                index: 1,
                title: 'Mafia',
            },
            neutral: {
                key: 'neutral',
                index: 2,
                title: 'Neutral',
            },
        },
        boardType: boardType.roles.key,
    },
    playerTags: {
        key: 'playerTags',
        index: 2,
        fieldType: fieldType.playerTag.key,
        title: 'Player Tags',
        boardType: boardType.roles.key,
    },
    roleCharges: {
        key: 'roleCharges',
        index: 3,
        fieldType: fieldType.number.key,
        title: 'Charges',
        boardType: boardType.roles.key,
    },
    priority: {
        key: 'priority',
        index: 4,
        fieldType: fieldType.priority.key,
        title: 'Priority',
        boardType: boardType.roles.key,
    },
    roleTargetMode: {
        key: 'roleTargetMode',
        index: 5,
        fieldType: fieldType.logic.key,
        title: 'Target Mode',
        vars: {
            "$choice.user": {
                key: '$choice.user',
                variableType: variableType.uid.key,
            },
            "$choice.target": {
                key: '$choice.target',
                variableType: variableType.uid.key,
            },
        },
        boardType: boardType.roles.key,
        default: defaultLogic,
    },
    roleAction: {
        key: 'roleAction',
        index: 6,
        fieldType: fieldType.logic.key,
        title: 'Action',
        vars: {
            "$choice.user": {
                key: '$choice.user',
                variableType: variableType.uid.key,
            },
            "$choice.target": {
                key: '$choice.target',
                variableType: variableType.uid.key,
            },
            "$choice.multitarget": {
                key: '$choice.multitarget',
                variableType: variableType.object.key,
            },
            "$choice.value": {
                key: '$choice.value',
                variableType: variableType.string.key,
            },
        },
        boardType: boardType.roles.key,
        default: defaultLogic,
    },
    phaseChoices: {
        key: 'phaseChoices',
        index: 1,
        fieldType: fieldType.choices.key,
        title: 'Phase Choices',
        boardType: boardType.phases.key,
    },
    phaseListener: {
        key: 'phaseListener',
        index: 2,
        fieldType: fieldType.logic.key,
        title: 'Phase Listener',
        boardType: boardType.phases.key,
        default: defaultLogic,
    },
}