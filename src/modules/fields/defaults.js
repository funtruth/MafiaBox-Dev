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
}

export const initFieldMap = {
    [boardType.library]: ['description0', 'args', 'vars', 'code'],
    [boardType.roles]: ['description1', 'roleTeam', 'roleCharges', 'roleActionMode'],
    [boardType.flow]: ['description2', 'phaseActionMode', 'phaseStrings', 'phaseTriggerMode'],
}

export const initFieldRepo = {
    description0: {
        fieldKey: 'description',
        fieldType: fieldType.text.key,
        fieldTitle: 'Description',
    },
    description1: {
        fieldKey: 'description',
        fieldType: fieldType.text.key,
        fieldTitle: 'Description',
    },
    description2: {
        fieldKey: 'description',
        fieldType: fieldType.text.key,
        fieldTitle: 'Description',
    },
    code: {
        fieldKey: 'code',
        fieldType: fieldType.code.key,
        fieldTitle: 'Code Interpretation',
    },
    args: {
        fieldKey: 'args',
        fieldType: fieldType.vars.key,
        fieldTitle: 'Required Variables',
    },
    vars: {
        fieldKey: 'vars',
        fieldType: fieldType.vars.key,
        fieldTitle: 'Declared Variables',
    },
    roleTeam: {
        fieldKey: 'roleTeam',
        fieldType: fieldType.tag.key,
        fieldTitle: 'Role Team',
    },
    roleCharges: {
        fieldKey: 'roleCharges',
        fieldType: fieldType.number.key,
        fieldTitle: 'Role Charges',
    },
    roleActionMode: {
        fieldKey: 'roleActionMode',
        fieldType: fieldType.logic.key,
        fieldTitle: 'Role Action Mode',
    },
    phaseActionMode: {
        fieldKey: 'phaseActionMode',
        fieldType: fieldType.tag.key,
        fieldTitle: 'Action Mode',
        data: ['phaseActionMode/all', 'phaseActionMode/king', 'phaseActionMode/clown', 'phaseActionMode/none']
    },
    phaseTriggerMode: {
        fieldKey: 'phaseTriggerMode',
        fieldType: fieldType.logic.key,
        fieldTitle: 'Phase Trigger',
        vars: {
            lobby: {
                key: 'lobby',
                variableType: variableType.object.key,
            },
            choices: {
                key: 'choices',
                variableType: variableType.object.key,
            },
            gameState: {
                key: 'gameState',
                variableType: variableType.object.key,
            },
        }
    },
    phaseStrings: {
        fieldKey: 'phaseStrings',
        fieldType: fieldType.strings.key,
        fieldTitle: 'Strings',
    }
}

export const initTagRepo = {
    'phaseActionMode/all': {
        tagKey: 'phaseActionMode/all',
        title: 'All',
    },
    'phaseActionMode/king': {
        tagKey: 'phaseActionMode/king',
        title: 'King',
    },
    'phaseActionMode/clown': {
        tagKey: 'phaseActionMode/clown',
        title: 'Clown',
    },
    'phaseActionMode/none': {
        tagKey: 'phaseActionMode/none',
        title: 'None',
    },
    'phaseTriggerType/none': {
        tagkey: 'phaseTriggerType/none',
        title: 'None',
    },
    'phaseTriggerType/allReady': {
        tagkey: 'phaseTriggerType/allReady',
        title: 'None',
    },
    'phaseTriggerType/majority': {
        tagkey: 'phaseTriggerType/majority',
        title: 'None',
    },
}