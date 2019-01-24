export const dropdownType = {
    storyShowMore: 'dropdownType/story-show-more',
    inputValue: 'dropdownType/input-value',

    showLibrary: 'dropdownType/show-library',
    pageLib: 'dropdownType/page-lib',
    storyMapLib: 'dropdownType/story-map-lib',

    pickLogic: 'dropdownType/show-logic',
    pickOperator: 'dropdownType/pick-operator',
    deleteLogic: 'dropdownType/delete-logic',
    returnTypes: 'dropdownType/return-types',

    editTag: 'dropdownType/edit-tag',
    addTag: 'dropdownType/add-tag',
    pickFieldType: 'dropdownType/pick-field-type',
    addTemplateField: 'dropdownType/add-template-field',
    templateTitleOptions: 'dropdownType/template-title-options',

    editVar: 'dropdownType/edit-var',
    addVar: 'dropdownType/add-var',
    pickVar: 'dropdownType/pick-var',
    pickVarProp: 'dropdownType/pick-var-prop',
    pickVarType: 'dropdownType/pick-var-type',
    pickComparison: 'dropdownType/pick-comparison',

    pickUpdateValue: 'dropdownType/pick-update-value',
    pickBoolean: 'dropdownType/pick-boolean',
    pickChoice: 'dropdownType/pick-choice',
    pickPhase: 'dropdownType/pick-phase',
    pickTimer: 'dropdownType/pick-timer',
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