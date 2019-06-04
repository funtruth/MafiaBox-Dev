import {
    logicType,
    operatorType,
    parseType,
    comparisonType,
    variableType,
} from '../common/types'
import {
    LOGIC_ITEM_VAR,
    LOGIC_ITEM_VAR_OPERATION,
} from './defaults';

import generatePushID from '../common/generatePushID';

export function generateLogic(type) {
    const [a,b,c,d,e,f,g,h] = ['a','b','c','d','e','f','g','h'].map(generatePushID)

    switch(type) {
        case logicType.variable.key:
        case logicType.update.key:
        case logicType.event.key:
            return {
                source: a,
                byId: {
                    [a]: {
                        ...LOGIC_ITEM_VAR,
                        key: a,
                        parseBy: parseType.collection,
                    },
                },
            }
        case logicType.return.key:
            return {
                source: a,
                byId: {
                    [a]: {
                        ...LOGIC_ITEM_VAR,
                        key: a,
                        parseBy: parseType.wrapper,
                        value: {
                            left: "return {",
                            right: "}",
                            middle: b,
                        }
                    },
                    [b]: {
                        ...LOGIC_ITEM_VAR,
                        key: b,
                        parseBy: parseType.collection,
                        value: [c, f],
                    },
                    [c]: {
                        ...LOGIC_ITEM_VAR,
                        key: c,
                        display: ':',
                        disabled: true,
                        parseBy: parseType.operation,
                        value: {
                            left: d,
                            right: e,
                            operator: ':',
                        }
                    },
                    [d]: {
                        ...LOGIC_ITEM_VAR,
                        key: d,
                        display: 'valid',
                        parseBy: parseType.constant,
                        value: 'valid',
                        variableTypes: [variableType.boolean.key],
                    },
                    [e]: {
                        ...LOGIC_ITEM_VAR,
                        key: e,
                        parseBy: parseType.variable,
                        value: 'true',
                        variableTypes: [variableType.boolean.key],
                    },
                    [f]: {
                        ...LOGIC_ITEM_VAR,
                        key: f,
                        display: ':',
                        disabled: true,
                        parseBy: parseType.operation,
                        value: {
                            left: g,
                            right: h,
                            operator: ':',
                        }
                    },
                    [g]: {
                        ...LOGIC_ITEM_VAR,
                        key: g,
                        display: 'message',
                        parseBy: parseType.constant,
                        value: 'message',
                        variableTypes: [variableType.string.key],
                    },
                    [h]: {
                        ...LOGIC_ITEM_VAR,
                        key: h,
                        parseBy: parseType.string,
                        variableTypes: [variableType.string.key],
                    },
                }
            }
        case logicType.function.key:
            console.warn('not supported yet.')
            return "";
        case operatorType.if.key:
        case operatorType.elseif.key:
            return {
                source: a,
                byId: {
                    [a]: {
                        ...LOGIC_ITEM_VAR,
                        key: a,
                        parseBy: parseType.wrapper,
                        value: {
                            ...operatorType[type].value,
                            middle: b,
                        },
                    },
                    [b]: {
                        ...LOGIC_ITEM_VAR,
                        key: b,
                        parseBy: parseType.operation,
                        value: {
                            ...LOGIC_ITEM_VAR_OPERATION,
                            left: c,
                            right: d,
                        }
                    },
                }
            }
        case operatorType.else.key:
            return {
                source: a,
                byId: {
                    [a]: {
                        ...LOGIC_ITEM_VAR,
                        key: a,
                        parseBy: parseType.wrapper,
                        value: operatorType[type].value,
                    },
                }
            }
        case operatorType.forin.key:
            return {
                source: a,
                byId: {
                    [a]: {
                        ...LOGIC_ITEM_VAR,
                        key: a,
                        parseBy: parseType.wrapper,
                        value: {
                            ...operatorType[type].value,
                            middle: b,
                        },
                    },
                    [b]: {
                        ...LOGIC_ITEM_VAR,
                        key: b,
                        parseBy: parseType.operation,
                        value: {
                            ...LOGIC_ITEM_VAR_OPERATION,
                            operator: comparisonType.in.key,
                            display: comparisonType.in.code,
                            left: c,
                            right: d,
                        }
                    }
                }
            }
        default:
            console.warn('not supported yet.')
            return "";
    }
}