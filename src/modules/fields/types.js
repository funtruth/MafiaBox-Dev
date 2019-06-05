export const boardType = {
    roles: {
        key: 'roles',
        title: 'Roles',
        icon: 'folder-account',
    },
    phases: {
        key: 'phases',
        title: 'Phases',
        icon: 'book-open-page-variant',
    },
    events: {
        key: 'events',
        title: 'Events',
        icon: 'calendar-text',
    },
    modes: {
        key: 'modes',
        title: 'Modes',
        icon: 'gamepad',
    },
}

export const fieldType = {
    call: {
        key: 'call',
        index: -1,
        icon: 'console',
        title: 'Call',
    },
    text: {
        key: 'text',
        index: 0,
        icon: 'format-text',
        title: 'Text',
    },
    number: {
        key: 'number',
        index: 1,
        icon: 'numeric',
        title: 'Number',
    },
    image: {
        key: 'image',
        index: 2,
        icon: 'image',
        title: 'Image',
    },
    logic: {
        key: 'logic',
        index: 3,
        icon: 'codepen',
        title: 'Logic',
    },
    uniqueTag: {
        key: 'uniqueTag',
        index: 4,
        icon: 'tag',
        title: 'Tag',
    },
    gameChoices: {
        key: 'gameChoices',
        index: 9,
        icon: 'map-marker-distance',
        title: 'Game Choices',
    },
    gameChoiceOverride: {
        key: 'gameChoiceOverride',
        index: 10,
        icon: 'map-marker-distance',
        title: 'Game Choice Override',
    },
    generalTag: {
        key: 'generalTag',
        index: 11,
        icon: 'tag',
        title: 'Player Tags',
    },
    priority: {
        key: 'priority',
        index: 12,
        icon: 'priority-high',
        title: 'Priority',
    },
    timer: {
        key: 'timer',
        index: 13,
        icon: 'timer-sand',
        title: 'Timer',
    }
}

export const phaseActionType = {
    all: {
        key: 'all',
        title: 'All',
    },
    king: {
        key: 'king',
        title: 'King',
    },
    jester: {
        key: 'jester',
        title: 'Jester',
    },
    none: {
        key: 'none',
        title: 'None',
    },
}

export const gameChoiceType = {
    target: {
        key: 'target',
        title: 'Single Target',
        icon: 'account',
    },
    multi: {
        key: 'multi',
        title: 'Multiple Targets',
        icon: 'account-multiple',
    },
    ordered: {
        key: 'ordered',
        title: 'Ordered Targets',
        icon: 'sort-numeric',
    },
    value: {
        key: 'value',
        title: 'Value',
        icon: 'tag',
    },
}