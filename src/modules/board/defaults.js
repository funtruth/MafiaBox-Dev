import { difficultyType } from './types'

export const DEFAULT_ROLE_SETUP = {
    title: '',
    players: 0,
    difficulty: difficultyType.normal.key,
    roles: '',
}

export const DEFAULT_EVENT_LISTENER = {
    title: '',
    eventLogic: '',
    location: '',
}