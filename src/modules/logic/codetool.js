import {
    logicType,
    operatorType,
    parseType,
    comparisonType,
} from '../common/types'
import {
    LOGIC_ITEM_VAR,
    LOGIC_ITEM_VAR_OPERATION,
} from './defaults';

import generatePushID from '../common/generatePushID';

export function generateLogic(type) {
    const [a,b,c,d] = ['a','b','c','d'].map(generatePushID)

    switch(type) {
        case logicType.variable.key:
        case logicType.update.key:
        case logicType.event.key:
            return {
                a,
                byId: {
                    [a]: {
                        ...LOGIC_ITEM_VAR,
                        key: a,
                        parseBy: parseType.collection,
                    },
                },
            }
        case logicType.return.key:
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