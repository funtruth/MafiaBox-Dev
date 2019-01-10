export function genUID(key) {
    return `${key}-xxxx`.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//updates a property deep inside an object and returns the entire object
//WARNING: cannot delete properties (THIS IS A FEATURE)
export function pathUpdate(args, index, repo) {
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

//returns boolean if element is a modal
export function isElementModal(target) {
    let isModal = target.className === 'modal'

    while(target.parentElement && !isModal) {
        if (target.parentElement.className === 'modal') {
            isModal = true
        } else {
            target = target.parentElement
        }
    }

    return isModal
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