import { boardType } from '../board/types'

export const initStoryMap = {
    boolean: {
        key: 'boolean',
        index: 0,
        title: 'Boolean',
        boardType: boardType.library,
        palette: 'palette-yellow',
        default: true,
    },
    functions: {
        key: 'functions',
        index: 1,
        title: 'Functions',
        boardType: boardType.library,
        palette: 'palette-blue',
        default: true,
    },
    inProgress: {
        key: 'inProgress',
        index: 0,
        title: 'In Progress',
        boardType: boardType.roles,
        palette: 'palette-yellow',
        default: true,
    },
    complete: {
        key: 'complete',
        index: 1,
        title: 'Complete',
        boardType: boardType.roles,
        palette: 'palette-blue',
        default: true,
    },
    live: {
        key: 'live',
        index: 2,
        title: 'Live',
        boardType: boardType.roles,
        palette: 'palette-green',
        default: true,
    },
    main: {
        key: 'main',
        index: 0,
        title: 'Main',
        boardType: boardType.flow,
        palette: 'palette-yellow',
        default: true,
    },
    unique: {
        key: 'unique',
        index: 1,
        title: 'Unique',
        boardType: boardType.flow,
        palette: 'palette-blue',
        default: true,
    },
    endState: {
        key: 'endState',
        index: 2,
        title: 'End State',
        boardType: boardType.flow,
        palette: 'palette-blue',
        default: true,
    },
}

export const initBoardRepo = {
    [boardType.library]: {
        title: 'Library',
    },
    [boardType.roles]: {
        title: 'Roles',
    },
    [boardType.flow]: {
        title: 'Phases',
    },
    [boardType.events]: {
        title: 'Events',
    },
}