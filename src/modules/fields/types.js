export const boardType = {
    roles: {
        key: 'roles',
        title: 'Roles',
        icon: 'mdi mdi-folder-account',
    },
    phases: {
        key: 'phases',
        title: 'Phases',
        icon: 'mdi mdi-book-open-page-variant',
    },
    events: {
        key: 'events',
        title: 'Events',
        icon: 'mdi mdi-calendar-text',
    },
    modes: {
        key: 'modes',
        title: 'Game modes',
        icon: 'mdi mdi-gamepad',
    },
}

export const fieldType = {
    call: {
        key: 'call',
        index: -1,
        icon: 'mdi mdi-console',
        title: 'Call',
    },
    text: {
        key: 'text',
        index: 0,
        icon: 'ion-md-list',
        title: 'Text',
    },
    number: {
        key: 'number',
        index: 1,
        icon: 'mdi mdi-numeric',
        title: 'Number',
    },
    image: {
        key: 'image',
        index: 2,
        icon: 'mdi mdi-image',
        title: 'Image',
    },
    logic: {
        key: 'logic',
        index: 3,
        icon: 'mdi mdi-codepen',
        title: 'Logic',
    },
    uniqueTag: {
        key: 'uniqueTag',
        index: 4,
        icon: 'ion-ios-pricetag',
        title: 'Tag',
    },
    gameChoices: {
        key: 'gameChoices',
        index: 9,
        icon: 'mdi mdi-map-marker-distance',
        title: 'Game Choices',
    },
    gameChoiceOverride: {
        key: 'gameChoiceOverride',
        index: 10,
        icon: 'mdi mdi-map-marker-distance',
        title: 'Game Choice Override',
    },
    generalTag: {
        key: 'generalTag',
        index: 11,
        icon: 'ion-ios-pricetag',
        title: 'Player Tags',
    },
    priority: {
        key: 'priority',
        index: 12,
        icon: 'mdi mdi-priority-high',
        title: 'Priority',
    },
    timer: {
        key: 'timer',
        index: 13,
        icon: 'mdi mdi-timer-sand',
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
        icon: 'mdi mdi-account',
    },
    multi: {
        key: 'multi',
        title: 'Multiple Targets',
        icon: 'mdi mdi-account-multiple',
    },
    ordered: {
        key: 'ordered',
        title: 'Ordered Targets',
        icon: 'mdi mdi-sort-numeric',
    },
    value: {
        key: 'value',
        title: 'Value',
        icon: 'mdi mdi-tag',
    },
}