import {
    logicType,
    mathType,
    operatorType,
    parseType,
    comparisonType,
} from '../common/types'
import {
    LOGIC_ITEM_DATA_SOURCE,
    LOGIC_ITEM_VAR,
    LOGIC_ITEM_VAR_OPERATION,
} from './defaults';

import { parseJS } from './proptool'
import generatePushID from '../common/generatePushID';

//TODO this whole file is garbage now :)
export function orderOfOp(assign) {
    if (!assign) return ''
    
    switch(assign.mathType) {
        case mathType.operation:
            return `(${orderOfOp(assign.left||{})} ${assign.mathOperatorType.char} ${orderOfOp(assign.right||{})})`
        case mathType.value:
            return parseJS(assign.value)
        default:
            return ''
    }
}

//return true if there is error
export function compileMath(assign) {
    if (!assign) return true

    switch(assign.mathType) {
        case mathType.value:
            if (assign.value === '') return true
            break
        case mathType.operation:
            if (compileMath(assign.right) || compileMath(assign.left)) return true
            break
        default:
            return true
    }
    return false
}

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