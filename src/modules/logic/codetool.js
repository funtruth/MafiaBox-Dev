import {
    logicType,
    mathType,
    operatorType,
    parseType,
} from '../common/types'
import {
    LOGIC_ITEM_DATA_SOURCE,
    LOGIC_ITEM_VAR,
    LOGIC_ITEM_VAR_COLLECTION,
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
    const source = generatePushID(LOGIC_ITEM_DATA_SOURCE)

    switch(type) {
        case logicType.variable.key:
        case logicType.update.key:
            return {
                source,
                byId: {
                    [source]: {
                        ...LOGIC_ITEM_VAR,
                        key: source,
                        parseBy: parseType.collection,
                        value: LOGIC_ITEM_VAR_COLLECTION,
                    },
                },
            }
        case logicType.event.key:
            return {
                source,
                byId: {
                    [source]: {
                        ...LOGIC_ITEM_VAR,
                        key: source,
                        parseBy: parseType.string,
                    },
                },
            }
        case logicType.return.key:
        case logicType.function.key:
            console.warn('not supported yet.')
            return "";
        case operatorType.if.key:
        case operatorType.elseif.key:
            const middle = generatePushID('middle')

            return {
                source,
                byId: {
                    [source]: {
                        ...LOGIC_ITEM_VAR,
                        key: source,
                        parseBy: parseType.wrapper,
                        value: {
                            ...operatorType[type].value,
                            middle,
                        },
                    },
                    [middle]: {
                        ...LOGIC_ITEM_VAR,
                        key: middle,
                        parseBy: parseType.operation,
                    }
                }
            }
        case operatorType.else.key:
            return {
                source,
                byId: {
                    [source]: {
                        ...LOGIC_ITEM_VAR,
                        key: source,
                        parseBy: parseType.wrapper,
                        value: operatorType[type].value,
                    },
                }
            }
        case operatorType.forin.key:
        default:
            console.warn('not supported yet.')
            return "";
    }
}