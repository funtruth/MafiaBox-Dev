import { boardType } from '../board/types'
import { variableType } from '../logic/types'

export const fieldType = {
    text: {
        key: 'text',
        index: 0,
        icon: 'ion-md-list',
        title: 'Text',
    },
    number: {
        key: 'number',
        index: 1,
        icon: 'ion-md-attach',
        title: 'Number',
    },
    code: {
        key: 'code',
        index: 2,
        icon: 'ion-md-code',
        title: 'Code',
    },
    logic: {
        key: 'logic',
        index: 3,
        icon: 'ion-md-options',
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
    strings: {
        key: 'strings',
        index: 8,
        icon: 'mdi mdi-code-string',
        title: 'String Maker',
    },
    choices: {
        key: 'choices',
        index: 9,
        icon: 'mdi mdi-source-branch',
        title: 'Choices',
    },
}

export const initFieldRepo = {
    description0: {
        key: 'description0',
        fieldKey: 'description0',
        index: 0,
        fieldType: fieldType.text.key,
        fieldTitle: 'Description',
        boardType: boardType.library,
    },
    description1: {
        key: 'description1',
        fieldKey: 'description1',
        index: 0,
        fieldType: fieldType.text.key,
        fieldTitle: 'Description',
        boardType: boardType.roles,
    },
    description2: {
        key: 'description2',
        fieldKey: 'description2',
        index: 0,
        fieldType: fieldType.text.key,
        fieldTitle: 'Description',
        boardType: boardType.phases,
    },
    code: {
        key: 'code',
        fieldKey: 'code',
        index: 0,
        fieldType: fieldType.code.key,
        fieldTitle: 'Code Interpretation',
        boardType: boardType.library,
    },
    args: {
        key: 'args',
        fieldKey: 'args',
        index: 0,
        fieldType: fieldType.vars.key,
        fieldTitle: 'Required Variables',
        boardType: boardType.library,
    },
    vars: {
        key: 'vars',
        fieldKey: 'vars',
        index: 0,
        fieldType: fieldType.vars.key,
        fieldTitle: 'Declared Variables',
        boardType: boardType.library,
    },
    roleTeam: {
        key: 'roleTeam',
        fieldKey: 'roleTeam',
        index: 1,
        fieldType: fieldType.tag.key,
        fieldTitle: 'Role Team',
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
        boardType: boardType.roles,
    },
    roleCharges: {
        key: 'roleCharges',
        fieldKey: 'roleCharges',
        index: 2,
        fieldType: fieldType.number.key,
        fieldTitle: 'Role Charges',
        boardType: boardType.roles,
    },
    roleTargetMode: {
        key: 'roleTargetMode',
        fieldKey: 'roleTargetMode',
        index: 3,
        fieldType: fieldType.logic.key,
        fieldTitle: 'Role Target Mode',
        vars: {
            lobby: {
                key: 'lobby',
                rss: true,
                variableType: variableType.object.key,
            },
            gameState: {
                key: 'gameState',
                rss: true,
                variableType: variableType.object.key,
            },
            updates: {
                key: 'updates',
                rss: true,
                variableType: variableType.object.key,
            },
            user: {
                key: 'user',
                variableType: variableType.uid.key,
            },
            target: {
                key: 'target',
                variableType: variableType.uid.key,
            },
        },
        boardType: boardType.roles,
    },
    roleActionMode: {
        key: 'roleActionMode',
        fieldKey: 'roleActionMode',
        index: 4,
        fieldType: fieldType.logic.key,
        fieldTitle: 'Role Action Mode',
        vars: {
            lobby: {
                key: 'lobby',
                rss: true,
                variableType: variableType.object.key,
            },
            updates: {
                key: 'updates',
                rss: true,
                variableType: variableType.object.key,
            },
            user: {
                key: 'user',
                variableType: variableType.uid.key,
            },
            target: {
                key: 'target',
                variableType: variableType.uid.key,
            },
        },
        boardType: boardType.roles,
    },
    phaseActionMode: {
        key: 'phaseActionMode',
        fieldKey: 'phaseActionMode',
        index: 1,
        fieldType: fieldType.tag.key,
        fieldTitle: 'Action Mode',
        data: {
            all: {
                key: 'all',
                index: 0,
                title: 'All',
            },
            king: {
                key: 'king',
                index: 1,
                title: 'King',
            },
            clown: {
                key: 'clown',
                index: 2,
                title: 'Clown',
            },
            none: {
                key: 'none',
                index: 3,
                title: 'None',
            },
        },
        boardType: boardType.phases,
    },
    phaseTriggerMode: {
        key: 'phaseTriggerMode',
        fieldKey: 'phaseTriggerMode',
        index: 4,
        fieldType: fieldType.logic.key,
        fieldTitle: 'Phase Trigger',
        vars: {
            lobby: {
                key: 'lobby',
                rss: true,
                variableType: variableType.object.key,
            },
            updates: {
                key: 'updates',
                rss: true,
                variableType: variableType.object.key,
            },
            choices: {
                key: 'choices',
                rss: true,
                variableType: variableType.object.key,
            },
            gameState: {
                key: 'gameState',
                rss: true,
                variableType: variableType.object.key,
            },
        },
        boardType: boardType.phases,
    },
    phaseStrings: {
        key: 'phaseStrings',
        fieldKey: 'phaseStrings',
        index: 2,
        fieldType: fieldType.strings.key,
        fieldTitle: 'Strings',
        boardType: boardType.phases,
    },
    phaseChoices: {
        key: 'phaseChoices',
        fieldKey: 'phaseChoices',
        index: 3,
        fieldType: fieldType.choices.key,
        fieldTitle: 'Phase Choices',
        boardType: boardType.phases,
    }
}