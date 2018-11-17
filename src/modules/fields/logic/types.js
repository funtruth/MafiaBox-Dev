export const logicType = {
    none: 'logicType/none',
    if: 'logicType/if',
    else: 'logicType/else',
    elseif: 'logicType/elseif',
    return: 'logicType/return',
}

export const logicTypeInfo = {
    [logicType.none]: {
        title: 'if',
        icon: 'ion-md-create',
        color: '#767676',
    },
    [logicType.if]: {
        title: 'if',
        icon: 'ion-ios-help',
        color: '#af8c40',
    },
    [logicType.else]: {
        title: 'else',
        icon: 'ion-ios-more',
        color: '#0e7db4',
    },
    [logicType.elseif]: {
        title: 'else if',
        icon: 'ion-ios-more',
        color: '#0e7db4',
    },
    [logicType.return]: {
        title: 'return',
        icon: 'ion-ios-return-right',
        color: '#744ee7',
    },
}

export const defaultLogic = {
    START: {
        logicType: logicType.none,
    }
}