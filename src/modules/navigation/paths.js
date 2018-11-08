export const pathKey = {
    defaults: 'defaults',
    board: 'board',
    flow: 'flow',
    testhub: 'testhub',
}

export const pathToLabel = {
    defaults: 'Rolecard',
    board: 'Storyboard',
    flow: 'Gameflow',
    testhub: 'Testhub',
}

export const pathToSublabel = {
    defaults: 'Create a role template',
    board: 'Organize your roles',
    flow: 'Set up game phases',
    testhub: 'Test a game phase',
}

export const sideBarList = ['defaults', 'board', 'flow', 'testhub']

export const flowBarList = [
    {
        key: 'info',
        title: 'Basic Info',
        subtitle: 'Edit basic details',
    },
    {
        key: 'target',
        title: 'Targetting',
        subtitle: 'Manage action limitations',
    },
    {
        key: 'phaseChange',
        title: 'Phase Changes',
        subtitle: 'Decide how phases change',
    }
]