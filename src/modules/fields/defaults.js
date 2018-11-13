import { boardType } from '../page/defaults'

export const moldType = {
    role: 'moldType/role',
    phase: 'moldType/phase',
}

export const fieldType = {
    text: 'fieldType/text',
    tag: 'fieldType/tag',
}

export const initFieldMap = {
    [boardType.roles]: ['roleDescription', 'roleTeam'],
    [boardType.flow]: [],
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
    }
}