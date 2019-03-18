import { boardType } from '../fields/defaults'

export const initStoryMap = {
    [boardType.roles.key]: {
        byId: {
            inProgress: {
                key: 'inProgress',
                title: 'In Progress',
                boardType: boardType.roles.key,
                palette: 'palette-yellow',
                default: true,
            },
            complete: {
                key: 'complete',
                title: 'Complete',
                boardType: boardType.roles.key,
                palette: 'palette-blue',
                default: true,
            },
            live: {
                key: 'live',
                title: 'Live',
                boardType: boardType.roles.key,
                palette: 'palette-green',
                default: true,
            },
        },
        byIndex: ['inProgress', 'complete', 'live'],
    },
    [boardType.phases.key]: {
        byId: {
            main: {
                key: 'main',
                title: 'Main',
                boardType: boardType.phases.key,
                palette: 'palette-yellow',
                default: true,
            },
            unique: {
                key: 'unique',
                title: 'Unique',
                boardType: boardType.phases.key,
                palette: 'palette-blue',
                default: true,
            },
            endState: {
                key: 'endState',
                title: 'End State',
                boardType: boardType.phases.key,
                palette: 'palette-blue',
                default: true,
            },
        },
        byIndex: ['main', 'unique', 'endState'],
    },
}

export const DEFAULT_NORMAL = {
    byId: {},
    byIndex: [],
}

export const initFunctionMap = {
    boolean: {
        key: 'boolean',
        index: 0,
        title: 'Boolean',
        boardType: boardType.library.key,
        palette: 'palette-yellow',
        default: true,
    },
    functions: {
        key: 'functions',
        index: 1,
        title: 'Functions',
        boardType: boardType.library.key,
        palette: 'palette-blue',
        default: true,
    },
}