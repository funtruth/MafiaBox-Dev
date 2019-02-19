export function genUID(key, repo, suffix='-xxxx') {
    return `${key}${suffix}`.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        var q = v.toString(16);
        return repo?repo[q]?genUID(key, repo):q:q;
    });
}

//updates a property deep inside an object and returns the entire object
//WARNING: cannot delete properties (THIS IS A FEATURE)
//TODO this needs to be moved up one level so it can be used easier
export function pathUpdate(args, index, repo) {
    if (args.length === 2) {
        return typeof args[args[index + 1]] === 'object' ? 
            {
                ...repo[args[index]]||{},
                ...args[index + 1],
            }
            :args[index + 1]
    }
    return {
        ...repo[args[index]]||{},
        [args[index + 1]]: index === args.length - 3 ?
            typeof args[args.length - 1] === 'object' ?
                {
                    ...(repo[args[index]]||{})[args[index + 1]]||{},
                    ...args[args.length - 1]
                }
                :args[args.length - 1]
            :pathUpdate(args, index + 1, repo[args[index]]||{})
    }
}

export function updateByPath(path, update, repo, pathIndex=0) {
    if (typeof update !== 'object') console.warn('somethign is wrong. Update is not an Object.')
    return {
        ...repo||{},
        ...((path.length > pathIndex) ?
            {
                [path[pathIndex]]: updateByPath(
                    path,
                    update,
                    repo[path[pathIndex]]||{},
                    pathIndex + 1
                ),
            }
            :update
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

export function swapVarFormat(string, ugly) {
    const itemType = typeof string
    switch(itemType) {
        case 'string':
            return ugly ?
                string.replace(/\./g, '§')
                :string.replace(/§/g, '.')
        case 'object':
            return JSON.parse(swapVarFormat(JSON.stringify(string), ugly))
        case 'undefined':
            return string
        default:
            return console.warn('Unexpected input, helpers swapVarFormat', {string})
    }   
}