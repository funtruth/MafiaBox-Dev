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
import generateIDs from '../common/generateIDs';

export function generateLogic(type) {
    let i;
    switch(type) {
        case logicType.variable.key:
        case logicType.update.key:
            i = generatePushID();
            return {
                source: i,
                byId: {
                    [i]: {
                        ...LOGIC_ITEM_VAR,
                        key: i,
                        display: true,
                        parseBy: parseType.collection,
                    },
                },
            }
        case logicType.event.key:
            i = generateIDs(12);
            return {
                source: i[0],
                byId: {
                    [i[0]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[0],
                        display: comparisonType.assign.code,
                        disabled: true,
                        parseBy: parseType.operation,
                        value: {
                            operator: comparisonType.assign.key,
                            left: i[1],
                            right: i[2],
                        },
                    },
                    [i[1]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[1],
                        disabled: true,
                        display: 'event placeholder',
                        parseBy: parseType.constant,
                        value: 'event placeholder',
                    },
                    [i[2]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[2],
                        parseBy: parseType.object,
                        value: [i[3], i[6], i[9]],
                        variableTypes: [variableType.uid.key],
                    },
                    [i[3]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[3],
                        display: ':',
                        disabled: true,
                        parseBy: parseType.operation,
                        value: {
                            left: i[4],
                            right: i[5],
                            operator: ':',
                        }
                    },
                    [i[4]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[4],
                        disabled: true,
                        display: 'showTo',
                        parseBy: parseType.constant,
                        value: 'showTo',
                        variableTypes: [variableType.boolean.key],
                    },
                    [i[5]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[5],
                        display: true,
                        parseBy: parseType.object,
                        variableTypes: [variableType.uid.key],
                    },
                    [i[6]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[6],
                        display: ':',
                        disabled: true,
                        parseBy: parseType.operation,
                        value: {
                            left: i[7],
                            right: i[8],
                            operator: ':',
                        }
                    },
                    [i[7]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[7],
                        disabled: true,
                        display: 'hideFrom',
                        parseBy: parseType.constant,
                        value: 'hideFrom',
                        variableTypes: [variableType.boolean.key],
                    },
                    [i[8]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[8],
                        display: true,
                        parseBy: parseType.object,
                        variableTypes: [variableType.uid.key],
                    },
                    [i[9]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[9],
                        display: ':',
                        disabled: true,
                        parseBy: parseType.operation,
                        value: {
                            left: i[10],
                            right: i[11],
                            operator: ':',
                        }
                    },
                    [i[10]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[10],
                        disabled: true,
                        display: 'message',
                        parseBy: parseType.constant,
                        value: 'message',
                        variableTypes: [variableType.string.key],
                    },
                    [i[11]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[11],
                        parseBy: parseType.string,
                        variableTypes: [variableType.string.key],
                    },
                }
            }
        case logicType.return.key:
            i = generateIDs(8);
            return {
                source: i[0],
                byId: {
                    [i[0]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[0],
                        parseBy: parseType.wrapper,
                        value: {
                            left: "return",
                            right: "",
                            middle: i[1],
                        }
                    },
                    [i[1]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[1],
                        parseBy: parseType.object,
                        value: [i[2], i[5]],
                    },
                    [i[2]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[2],
                        display: ':',
                        disabled: true,
                        parseBy: parseType.operation,
                        value: {
                            left: i[3],
                            right: i[4],
                            operator: ':',
                        }
                    },
                    [i[3]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[3],
                        disabled: true,
                        display: 'valid',
                        parseBy: parseType.constant,
                        value: 'valid',
                        variableTypes: [variableType.boolean.key],
                    },
                    [i[4]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[4],
                        parseBy: parseType.boolean,
                        display: 'true',
                        value: true,
                        variableTypes: [variableType.boolean.key],
                    },
                    [i[5]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[5],
                        display: ':',
                        disabled: true,
                        parseBy: parseType.operation,
                        value: {
                            left: i[6],
                            right: i[7],
                            operator: ':',
                        }
                    },
                    [i[6]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[6],
                        disabled: true,
                        display: 'message',
                        parseBy: parseType.constant,
                        value: 'message',
                        variableTypes: [variableType.string.key],
                    },
                    [i[7]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[7],
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
            i = generateIDs(4);
            return {
                source: i[0],
                byId: {
                    [i[0]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[0],
                        parseBy: parseType.wrapper,
                        value: {
                            ...operatorType[type].value,
                            middle: i[1],
                        },
                    },
                    [i[1]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[1],
                        parseBy: parseType.operation,
                        value: {
                            ...LOGIC_ITEM_VAR_OPERATION,
                            left: i[2],
                            right: i[3],
                        }
                    },
                }
            }
        case operatorType.else.key:
            i = generatePushID();
            return {
                source: i,
                byId: {
                    [i]: {
                        ...LOGIC_ITEM_VAR,
                        key: i,
                        parseBy: parseType.wrapper,
                        value: operatorType[type].value,
                    },
                }
            }
        case operatorType.forin.key:
            i = generateIDs(4);
            return {
                source: i[0],
                byId: {
                    [i[0]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[0],
                        parseBy: parseType.wrapper,
                        value: {
                            ...operatorType[type].value,
                            middle: i[1],
                        },
                    },
                    [i[1]]: {
                        ...LOGIC_ITEM_VAR,
                        key: i[1],
                        parseBy: parseType.operation,
                        value: {
                            ...LOGIC_ITEM_VAR_OPERATION,
                            operator: comparisonType.in.key,
                            display: comparisonType.in.code,
                            left: i[2],
                            right: i[3],
                        }
                    }
                }
            }
        default:
            console.warn('not supported yet.')
            return "";
    }
}