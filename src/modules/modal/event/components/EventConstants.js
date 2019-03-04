export const ItemTypes = {
    EVENT_STRING: 'rankingItem',
    EVENT_COLOR: 'eventColor',
    EVENT_VAR: 'eventVar',
    EVENT_UID: 'eventUid',
    EVENT_FUNCTION: 'eventFunction',
}

export const EventTextColors = [
    '#fff',
    '#F9F871',
    '#9DEB84',
    '#30D6A4',
    '#00BCBD',
    '#009EC4',
    '#0e7db4',
    '#4578BB',
    '#6C70BB',
    '#8E66B3',
    '#AB5AA3',
    '#C0508C',
    '#db4757',
]

export const EventFunctions = {
    getNameFromUid: {
        key: 'getNameFromUid',
        label: 'Name',
        wrapper: (s) => `rss.lobby[${s}].name`,
    },
    getRoleFromUid: {
        key: 'getRoleFromUid',
        label: 'Role',
        wrapper: (s) => `rss.lobby[${s}].role.name`,
    },
}

export const PartTypes = {
    string: 'string',
    function: 'function',
}

/* EditEvent [attach/workspace]
    eventIndex: '',
    selectedColor: '#fff',
    eventArr: {
        [key]: {
            stringArr: [
                {
                    partType: '',
                    functionKey: '',
                    string: '',
                    color: '',
                },
            ],
            showTo: {
                [key]: boolean,
            },
            hideFrom: {
                [key]: boolean,
            },
        }
    }
*/
export const WS_EDIT_EVENT = {
    eventIndex: 0,
    stringIndex: '',
    selectedColor: '#fff',
    eventArr: [],
}
export const WS_EDIT_EVENT_VALUE = {
    stringArr: [],
    showTo: {},
    hideFrom: {},
}
export const WS_EDIT_EVENT_STRING = {
    partType: PartTypes.string,
    functionKey: '',
    string: '',
    color: '',
}