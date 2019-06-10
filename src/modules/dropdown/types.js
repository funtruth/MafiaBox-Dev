export const dropdownType = {
    //common
    dropString: 'dropdownType/drop-string',
    dropNumber: 'dropdownType/drop-number',

    pickLogic: 'dropdownType/show-logic',
    pickOperator: 'dropdownType/pick-operator',

    createTag: 'dropdownType/create-tag',
    editUniqueTag: 'dropdownType/edit-unique-tag',
    editGeneralTag: 'dropdownType/edit-general-tag',
    createGameChoice: 'dropdownType/create-game-choice',
    pickGameChoiceType: 'dropdownType/pick-game-choice-type',
    gameChoiceOrdered: 'dropdownType/game-choice-ordered',

    //account
    accountOptions: 'dropdownType/account-options',
    pickProject: 'dropdownType/pick-project',

    //board
    editPlayerNum: 'dropdownType/edit-player-num',
    patchItemOptions: 'dropdownType/patch-item-options',
    roleItemOptions: 'dropdownType/role-item-options',

    //page
    pageHistory: 'dropdownType/page-history',
    pageOptions: 'dropdownType/page-options',

    pickVar: 'dropdownType/pick-var',
    pickVarSubfield: 'dropdownType/pick-var-subfield',
    pickVarWithType: 'dropdownType/pick-var-with-type',
    pickVarTags: 'dropdownType/pick-var-tags',
    pickComparison: 'dropdownType/pick-comparison',
    replaceWildcard: 'dropdownType/replace-wildcard',
    createGlobalVar: 'dropdownType/create-global-var',
    varItemConstant: 'dropdownType/var-item-constant',
    declareVarType: 'dropdownType/declare-var-type',
    declareVarName: 'dropdownType/declare-var-name',
    declarePanelVar: 'dropdownType/declare-panel-var',

    pickUpdateValue: 'dropdownType/pick-update-value',
    pickTrigger: 'dropdownType/pick-trigger',

    pickGlobalVar: 'dropdownType/pick-global-var',
    pickRecipient: 'dropdownType/pick-recipient',

    //NumberViews
    pickNumValue: 'dropdownType/pick-num-value',
}

export const fuseType = {
    searchBoard: {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "title"
        ],
    },
    stringDashboard: {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            {
                name: 'title',
                weight: 0.7,
            },
            {
                name: 'string',
                weight: 0.3,
            },
        ],
    },
    globalVar: {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "title"
        ],
    },
    searchRoles: {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        tokenize: true,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "title"
        ],
    },
}

export const DROPDOWN_Y_MARGIN = 8
export const DROP_TITLE_HEIGHT = 21