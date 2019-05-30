export const dropdownType = {
    //common
    dropString: 'dropdownType/drop-string',

    inputValue: 'dropdownType/input-value',
    storyMapLib: 'dropdownType/story-map-lib',
    pageLib: 'dropdownType/page-lib',
    pageDetailLib: 'dropdownType/page-detail-lib',

    dropInput: 'dropdownType/drop-input',

    pickLogic: 'dropdownType/show-logic',
    pickOperator: 'dropdownType/pick-operator',

    createUniqueTag: 'dropdownType/create-unique-tag',
    editUniqueTag: 'dropdownType/edit-unique-tag',
    createGeneralTag: 'dropdownType/create-general-tag',
    editGeneralTag: 'dropdownType/edit-general-tag',
    createGameChoice: 'dropdownType/create-game-choice',
    pickGameChoiceType: 'dropdownType/pick-game-choice-type',
    writeGameChoice: 'dropdownType/write-game-choice',

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

    //functions
    declareOrAssignVar: 'dropdownType/declare-var',
    editVarName: 'dropdownType/edit-var-name',
    writeVarType: 'dropdownType/write-var-type',

    pickOpType: 'dropdownType/pick-op-type',

    addVar: 'dropdownType/add-var',
    editVar: 'dropdownType/edit-var',
    pickVar: 'dropdownType/pick-var',
    pickVarSubfield: 'dropdownType/pick-var-subfield',
    pickVarWithType: 'dropdownType/pick-var-with-type',
    pickUidObject: 'dropdownType/pick-uid-object',
    pickVarType: 'dropdownType/pick-var-type',
    pickComparison: 'dropdownType/pick-comparison',
    replaceWildcard: 'dropdownType/replace-wildcard',
    createGlobalVar: 'dropdownType/create-global-var',
    pickGlobalValue: 'dropdownType/pick-global-value',

    pickBooleanAssign: 'dropdownType/pick-boolean-assign',
    pickUidAssign: 'dropdownType/pick-uid-for-assign',
    declareVarType: 'dropdownType/declare-var-type',

    pickUpdateValue: 'dropdownType/pick-update-value',
    pickBoolean: 'dropdownType/pick-boolean',
    pickChoice: 'dropdownType/pick-choice',
    pickPhase: 'dropdownType/pick-phase',
    pickTimer: 'dropdownType/pick-timer',
    pickTrigger: 'dropdownType/pick-trigger',
    pickNumUpdate: 'dropdownType/pick-update',
    pickUid: 'dropdownType/pick-uid',
    pickHealth: 'dropdownType/pick-health',
    pickRole: 'dropdownType/pick-role',
    pickLibrary: 'dropdownType/pick-library',
    showSubfields: 'dropdownType/show-subfields',
    showUidSubfield: 'dropdownType/show-uid-subfield',
    showRoleSubfields: 'dropdownType/show-role-subfields',
    pickRoleTeam: 'dropdownType/pick-role-team',
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