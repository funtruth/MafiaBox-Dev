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

export function checkAlpha(string, cipher='A26') {
    for (var i=0; i<string.length; i++) {
        if (CIPHER[cipher].indexOf(string.charAt(i)) === -1) {
            return false
        }
    }
    return true
}