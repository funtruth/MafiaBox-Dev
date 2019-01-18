export function genUID(key, repo) {
    return `${key}-xxxx`.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        var q = v.toString(16);
        return repo?repo[q]?genUID(key, repo):q:q;
    });
}

//updates a property deep inside an object and returns the entire object
//WARNING: cannot delete properties (THIS IS A FEATURE)
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

export function getZIndex(a, b) {
    return Math.max(
        a[a.length - 1] ? a[a.length - 1].zIndex : 1,
        b[b.length - 1] ? b[b.length - 1].zIndex : 1,
        1, ) + 1
}