import { logicType } from './types'

/* function compile
    takes the item key and the overall value
    returns warnings and errors
*/
export function compile(key, map) {
    let errors = []
    let parent = getParent(key, map)

    //cases = []
    //loop through yellow then red?

    //if no logicType
    if (!map[key].logicType) {
        addYellow('No operator selected.', errors)
    }

    //if logicType is else and page selected
    if (!map[key].logicType === logicType.else && map[key].pageKey) {
        addYellow('Else cannot have a condition.', errors)
    }

    //if logicType needs condition but no condition
    if (map[key].logicType && (map[key].logicType !== logicType.else) && !map[key].pageKey) {
        addYellow('Missing condition.', errors)
    }

    //if parent exists and is an if statement
    if (parent.key && parent.type && map[key].logicType === logicType.if) {
        addYellow('if operator must come first.', errors)
    }

    //if vertical parent is else or return
    if (parent.type === 'down') {
        if (map[parent.key].logicType === logicType.else) {
            addRed('Cannot be after else operator.', errors)
        } else if (map[parent.key].logicType === logicType.return) {
            addRed('Cannot be after return operator', errors)
        }
    }

    return errors
}

/*
    MUTATES
*/
function addYellow(text, errors) {
    errors.push({
        icon: 'ion-md-warning',
        color: 'rgba(255,223,68)',
        fontSize: 14,
        text,
    })
}

/*
    MUTATES
*/
function addRed(text, errors) {
    errors.push({
        icon: 'ion-md-warning',
        color: '#db4757',
        fontSize: 16,
        text,
    })
}

export function getParent(key, values) {
    for (var logicKey in values) {
        if (values[logicKey].right === key) {
            return {
                key: logicKey,
                type: 'right',
            }
        } else if (values[logicKey].down === key) {
            return {
                key: logicKey,
                type: 'down',
            }
        }
    }
    return {
        key: null,
        type: null,
    }
}