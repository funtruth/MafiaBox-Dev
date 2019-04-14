export const dropdownType = {
    inputValue: 'dropdownType/input-value',
    storyMapLib: 'dropdownType/story-map-lib',
    pageLib: 'dropdownType/page-lib',
    pageDetailLib: 'dropdownType/page-detail-lib',

    dropInput: 'dropdownType/drop-input',

    pickLogic: 'dropdownType/show-logic',
    pickOperator: 'dropdownType/pick-operator',
    pickReturnType: 'dropdownType/pick-return-type',

    editTag: 'dropdownType/edit-tag',
    createUniqueTag: 'dropdownType/create-unique-tag',
    createGeneralTag: 'dropdownType/create-general-tag',
    pickFieldType: 'dropdownType/pick-field-type',
    templateTitleOptions: 'dropdownType/template-title-options',

    //account
    accountOptions: 'dropdownType/account-options',
    pickProject: 'dropdownType/pick-project',

    //board
    patchItemOptions: 'dropdownType/patch-item-options',
    roleItemOptions: 'dropdownType/role-item-options',

    //page
    pageHistory: 'dropdownType/page-history',
    pageOptions: 'dropdownType/page-options',

    //functions
    declareVar: 'dropdownType/declare-var',
    editVarName: 'dropdownType/edit-var-name',
    writeVarType: 'dropdownType/write-var-type',

    pickOp: 'dropdownType/pick-op',
    pickOpType: 'dropdownType/pick-op-type',
    changeOp: 'dropdownType/change-op',
    pickAssignableVar: 'dropdownType/pick-assignable-var',
    setOpValueTo: 'dropdownType/set-op-value-to',

    addVar: 'dropdownType/add-var',
    editVar: 'dropdownType/edit-var',
    pickVar: 'dropdownType/pick-var',
    pickVarProp: 'dropdownType/pick-var-prop',
    pickUidObject: 'dropdownType/pick-uid-object',
    pickVarType: 'dropdownType/pick-var-type',
    pickComparison: 'dropdownType/pick-comparison',

    pickBooleanAssign: 'dropdownType/pick-boolean-assign',
    pickUidAssign: 'dropdownType/pick-uid-for-assign',
    declareVarType: 'dropdownType/declare-var-type',

    pickUpdateValue: 'dropdownType/pick-update-value',
    pickBoolean: 'dropdownType/pick-boolean',
    pickChoice: 'dropdownType/pick-choice',
    pickPhase: 'dropdownType/pick-phase',
    pickTimer: 'dropdownType/pick-timer',
    pickTeam: 'dropdownType/pick-team',
    pickTrigger: 'dropdownType/pick-trigger',
    pickNumUpdate: 'dropdownType/pick-update',
    pickUid: 'dropdownType/pick-uid',
    pickHealth: 'dropdownType/pick-health',
    pickRole: 'dropdownType/pick-role',
    pickLibrary: 'dropdownType/pick-library',
    showSubfields: 'dropdownType/show-subfields',
    showUidSubfield: 'dropdownType/show-uid-subfield',
    pickGeneralTag: 'dropdownType/pick-general-tag',
    pickRoleTeam: 'dropdownType/pick-role-team',

    pickEvent: 'dropdownType/pick-event',
    pickEventVar: 'dropdownType/pick-event-var',
    pickEventVarProp: 'dropdownType/pick-event-var-prop',
    pickRecipient: 'dropdownType/pick-recipient',
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
    }
}

export const DROPDOWN_Y_MARGIN = 8
export const DROP_TITLE_HEIGHT = 21