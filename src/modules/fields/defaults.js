import { boardType } from '../page/defaults'
import { phaseActionMode, phaseTriggerType } from './actions'

export const moldType = {
    role: 'moldType/role',
    phase: 'moldType/phase',
}

export const fieldType = {
    text: 'fieldType/text',
    tag: 'fieldType/tag',
    expertTag: 'fieldType/expertTag',
    phaseTrigger: 'fieldType/phaseTrigger',
}

export const fieldIcon = {
    text: 'ion-md-list',
    tag: 'ion-ios-pricetag',
    expertTag: 'ion-ios-pricetags',
    phaseTrigger: 'ion-md-fastforward',
}

export const initFieldMap = {
    [boardType.roles]: ['roleDescription', 'roleTeam', ],
    [boardType.flow]: ['phaseDescription', 'phaseActionMode', 'phaseTriggerMode'],
}

export const initFieldRepo = {
    roleDescription: {
        fieldKey: 'roleDescription',
        fieldType: fieldType.text,
        fieldTitle: 'Role Description',
    },
    roleTeam: {
        fieldKey: 'roleTeam',
        fieldType: fieldType.tag,
        fieldTitle: 'Role Team',
        data: [
            {
                key: 'roleTeam/mafia',
                title: 'Mafia',
            },
            {
                key: 'roleTeam/town',
                title: 'Town',
            },
            {
                key: 'roleTeam/neutral',
                title: 'Neutral',
            }
        ]
    },
    phaseDescription: {
        fieldKey: 'phaseDescription',
        fieldType: fieldType.text,
        fieldTitle: 'Phase Description',
    },
    phaseActionMode: {
        fieldKey: 'phaseActionMode',
        fieldType: fieldType.tag,
        fieldTitle: 'Action Mode',
        data: [
            {
                key: phaseActionMode.all,
                title: 'All',
            },
            {
                key: phaseActionMode.king,
                title: 'King',
            },
            {
                key: phaseActionMode.clown,
                title: 'Clown',
            },
            {
                key: phaseActionMode.none,
                title: 'None',
            },
        ]
    },
    phaseTriggerMode: {
        fieldKey: 'phaseTriggerMode',
        fieldType: fieldType.phaseTrigger,
        fieldTitle: 'Phase Trigger',
        data: [
            {
                key: phaseTriggerType.allReady,
                title: 'All Ready',
            },
            {
                key: phaseTriggerType.majority,
                title: 'Majority',
            }
        ]
    }
}