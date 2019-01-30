//import { logicType } from './types'

/* function compile
    takes the item key and the overall value
    returns warnings and errors
*/
export function compile(key, map) {
    let errors = []
    //let parent = getParent(key, map)

    //cases = []
    //loop through yellow then red?

    //if no logicType
    if (!map[key].logicType) {
        addYellow('No operator selected', errors)
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
export function addRed(text, errors) {
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