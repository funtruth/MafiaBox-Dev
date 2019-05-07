export const boardType = {
    library: {
        key: 'library',
        title: 'Library',
        label: 'Library',
        icon: 'mdi mdi-library-books',
    },
    functions: {
        key: 'functions',
        title: 'Functions',
        label: 'Functions',
        icon: 'mdi mdi-function-variant',
    },
    phases: {
        key: 'phases',
        title: 'Phases',
        label: 'Phases',
        icon: 'mdi mdi-book-open-page-variant',
    },
    roles: {
        key: 'roles',
        title: 'Roles',
        label: 'Roles',
        icon: 'mdi mdi-folder-account',
    },
    events: {
        key: 'events',
        title: 'Events',
        label: 'Events',
        icon: 'mdi mdi-calendar-text',
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
    vars: {
        key: 'vars',
        index: 5,
        icon: 'ion-md-planet',
        title: 'Vars',
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