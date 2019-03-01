export const dropdownType = {
    storyShowMore: 'dropdownType/story-show-more',
    inputValue: 'dropdownType/input-value',
    storyMapLib: 'dropdownType/story-map-lib',
    pageLib: 'dropdownType/page-lib',

    dropInput: 'dropdownType/drop-input',

    pickLogic: 'dropdownType/show-logic',
    showLogicOptions: 'dropdownType/show-logic-options',
    pickOperator: 'dropdownType/pick-operator',
    deleteLogic: 'dropdownType/delete-logic',
    pickDeleteMode: 'dropdownType/pick-delete-mode',
    pickReturnType: 'dropdownType/pick-return-type',

    editTag: 'dropdownType/edit-tag',
    addTag: 'dropdownType/add-tag',
    pickFieldType: 'dropdownType/pick-field-type',
    addTemplateField: 'dropdownType/add-template-field',
    templateTitleOptions: 'dropdownType/template-title-options',

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
    pickUidObject: 'dropdownType/pick-object',
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
    pickUpdate: 'dropdownType/pick-update',
    pickUid: 'dropdownType/pick-uid',
    pickHealth: 'dropdownType/pick-health',
    pickRole: 'dropdownType/pick-role',
    pickLibrary: 'dropdownType/pick-library',
    showSubfields: 'dropdownType/show-subfields',

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

export const StatefulSourceId = {
    editToast: 'edit-toast',
    editEvent: 'edit-event',
}

export const DROP_TITLE_HEIGHT = 21

export const VAR_DEFAULTS = {
    adjust: "",
    declare: {},
    hide: false,
    length: false,
    mutate: false,
    panelType: "",
    update: false,
    updateViewType: "",
    value: "",
    variableTypes: [],
}