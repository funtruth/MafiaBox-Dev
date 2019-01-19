export const dropdownType = {
    storyShowMore: 'dropdownType/story-show-more',
    inputValue: 'dropdownType/input-value',

    showLibrary: 'dropdownType/show-library',
    pageLib: 'dropdownType/page-lib',
    storyMapLib: 'dropdownType/story-map-lib',

    showLogic: 'dropdownType/show-logic',
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

    pickUpdate: 'dropdownType/pick-update',
    addUpdateField: 'dropdownType/add-update-field',
    pickUpdateValue: 'dropdownType/pick-update-value',
    pickPhase: 'dropdownType/pick-phase',
    pickUid: 'dropdownType/pick-uid',
    pickHealth: 'dropdownType/pick-health',
    pickTrigger: 'dropdownType/pick-trigger',
    pickBoolean: 'dropdownType/pick-boolean',
    pickRole: 'dropdownType/pick-role',
    pickLibrary: 'dropdownType/pick-library',

    pickEvent: 'dropdownType/pick-event',
    pickEventVar: 'dropdownType/pick-event-var',
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