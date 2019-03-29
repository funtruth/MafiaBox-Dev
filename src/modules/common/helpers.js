const CIPHER = {
    A26: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    A26wSPACE: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ',
    A26N10wDESC: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 !?#%',
}

function isArray(obj){
    return !!obj && obj.constructor === Array;
}

export function genUID(key, repo, suffix='-xxxx') {
    return key.replace(" ", "") + suffix.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        var q = v.toString(16);
        return repo?repo[q]?genUID(key, repo):q:q;
    });
}

//updates a property deep inside an object and returns the entire object
//WARNING: cannot delete properties (THIS IS A FEATURE)
export function updateByPath(path=[], update, repo, pathIndex=0) {
    const typeofUpdate = typeof update
    const endOfPath = path.length <= pathIndex

    //handling String, Number, and Array updates
    if (endOfPath) {
        if (typeofUpdate === 'string' || typeofUpdate === 'number') {
            return update
        } else if (isArray(update)) {
            return update
        }
    }

    return {
        ...repo||{},
        ...(endOfPath ?
            update
            :{
                [path[pathIndex]]: updateByPath(
                    path,
                    update,
                    repo[path[pathIndex]]||{},
                    pathIndex + 1,
                ),
            }
        ),
    }
}

//returns boolean if element is a dropdown
export function isElementDropdown(target) {
    let isDropdown = target.className === 'drop-down-menu'

    while(target.parentElement && !isDropdown) {
        if (target.parentElement.className === 'drop-down-menu') {
            isDropdown = true
        } else {
            target = target.parentElement
        }
    }
    
    return isDropdown
}

export function isAppClickCancelled(target) {
    let isCancel = false

    while(target.parentElement && !isCancel) {
        if (target.parentElement.getAttribute('cancel-appclick')) {
            isCancel = true
        } else {
            target = target.parentElement
        }
    }

    return isCancel
}

export function getDropdownParentTarget(ele) {
    let nextTarget = ele.parentElement

    while (nextTarget) {
        if (nextTarget.className === 'drop-down-menu') {
            return nextTarget
        } else {
            nextTarget = nextTarget.parentElement
        }
    }

    return null
}

export const remove$ = (string='') => string.charAt(0) === '@' ? string.substr(1) : string

export function checkAlpha(string, cipher='A26') {
    for (var i=0; i<string.length; i++) {
        if (CIPHER[cipher].indexOf(string.charAt(i)) === -1) {
            return false
        }
    }
    return true
}