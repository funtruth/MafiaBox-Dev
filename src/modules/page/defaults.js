import { boardType } from '../board/types'

export const initStoryMap = [
    {
        key: 'conditionals',
        title: 'Conditionals',
        boardType: boardType.library,
        palette: 'palette-yellow',
        default: true,
    },
    {
        key: 'functions',
        title: 'Functions',
        boardType: boardType.library,
        palette: 'palette-blue',
        default: true,
    },
    {
        key: 'inProgress',
        title: 'In Progress',
        boardType: boardType.roles,
        palette: 'palette-yellow',
        default: true,
    },
    {
        key: 'complete',
        title: 'Complete',
        boardType: boardType.roles,
        palette: 'palette-blue',
        default: true,
    },
    {
        key: 'live',
        title: 'Live',
        boardType: boardType.roles,
        palette: 'palette-green',
        default: true,
    },
    {
        key: 'main',
        title: 'Main',
        boardType: boardType.flow,
        palette: 'palette-yellow',
        default: true,
    },
    {
        key: 'unique',
        title: 'Unique',
        boardType: boardType.flow,
        palette: 'palette-blue',
        default: true,
    },
    {
        key: 'endState',
        title: 'End State',
        boardType: boardType.flow,
        palette: 'palette-blue',
        default: true,
    },
]