import { boardType } from '../board/types'

export const fieldType = {
    text: 'fieldType/text',
    number: 'fieldType/number',
    code: 'fieldType/code',
    logic: 'fieldType/logic',
    tag: 'fieldType/tag',
    property: 'fieldType/property',
    expertTag: 'fieldType/expertTag',
}

export const fieldTypeToIcon = {
    [fieldType.text]: 'ion-md-list',
    [fieldType.number]: 'ion-md-attach',
    [fieldType.code]: 'ion-md-code',
    [fieldType.logic]: 'ion-md-options',
    [fieldType.tag]: 'ion-ios-pricetag',
    [fieldType.property]: 'ion-md-switch',
    [fieldType.expertTag]: 'ion-ios-pricetags',
}

export const fieldTypeToTitle = {
    [fieldType.text]: 'Text',
    [fieldType.number]: 'Number',
    [fieldType.code]: 'Code',
    [fieldType.logic]: 'Logic',
    [fieldType.tag]: 'Tag',
    [fieldType.property]: 'Properties',
    [fieldType.expertTag]: 'Expert Tag',
}

export const fieldIcon = {
    text: 'ion-md-list',
    tag: 'ion-ios-pricetag',
    code: 'ion-md-code',
    logic: 'ion-md-options',
    expertTag: 'ion-ios-pricetags',
}

export const initFieldMap = {
    [boardType.library]: ['description', 'code'],
    [boardType.roles]: ['description', 'roleTeam', 'roleCharges', 'roleActionMode'],
    [boardType.flow]: ['description', 'phaseActionMode', 'phaseTriggerMode'],
}

export const initFieldRepo = {
    description: {
        fieldKey: 'description',
        fieldType: fieldType.text,
        fieldTitle: 'Description',
    },
    code: {
        fieldKey: 'code',
        fieldType: fieldType.code,
        fieldTitle: 'Code Interpretation',
    },
    roleTeam: {
        fieldKey: 'roleTeam',
        fieldType: fieldType.tag,
        fieldTitle: 'Role Team',
    },
    roleCharges: {
        fieldKey: 'roleCharges',
        fieldType: fieldType.number,
        fieldTitle: 'Role Charges',
    },
    roleActionMode: {
        fieldKey: 'roleActionMode',
        fieldType: fieldType.logic,
        fieldTitle: 'Role Action Mode',
    },
    phaseActionMode: {
        fieldKey: 'phaseActionMode',
        fieldType: fieldType.tag,
        fieldTitle: 'Action Mode',
        data: ['phaseActionMode/all', 'phaseActionMode/king', 'phaseActionMode/clown', 'phaseActionMode/none']
    },
    phaseTriggerMode: {
        fieldKey: 'phaseTriggerMode',
        fieldType: fieldType.logic,
        fieldTitle: 'Phase Trigger',
    },
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