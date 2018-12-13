export const logicType = {
    none: 'logicType/none',
    if: 'logicType/if',
    else: 'logicType/else',
    elseif: 'logicType/elseif',
    operator: 'logicType/operator',
    function: 'logicType/function',
    return: 'logicType/return',
}

export const logicTypeInfo = {
    [logicType.none]: {
        title: 'none',
        icon: 'ion-md-create',
        color: '#767676',
    },
    [logicType.if]: {
        title: 'if',
        icon: 'ion-md-help',
        color: '#af8c40',
    },
    [logicType.else]: {
        title: 'else',
        icon: 'ion-ios-more',
        color: '#db4757',
    },
    [logicType.elseif]: {
        title: 'else if',
        icon: 'ion-ios-more',
        color: '#0e7db4',
    },
    [logicType.operator]: {
        title: 'operator',
        icon: 'ion-md-code-working',
        color: 'Mediumslateblue'
    },
    [logicType.function]: {
        title: 'function',
        icon: 'ion-md-pulse',
        color: '#3864ab',
    },
    [logicType.return]: {
        title: 'return',
        icon: 'ion-ios-send',
        color: '#1e9939',
    },
}

export const defaultLogic = {
    START: {
        logicType: logicType.none,
    }
}