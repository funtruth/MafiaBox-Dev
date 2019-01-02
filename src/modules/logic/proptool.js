import _ from 'lodash'

export function getUpdateFields(prefix, library) {
    const props = prefix.split('.')

    let libClone = {}
    Object.assign(libClone, library)
    for (var i=0; i<props.length; i++) {
        if (!libClone[props[i]] && !libClone['/uid/']) {
            console.warn(`Field ${props[i]} does not exist in library.`)
            return []
        }
        libClone = libClone[props[i]] || libClone['/uid/']
    }

    return Object.keys(libClone)
}

//library refers to the data object in the logic item
export function getExistingFields(prefix, library) {
    const parts = prefix.split('.')
    let fields = []
    
    for (var key in library) {
        const newParts = key.split('.')
        let match = true

        for (var i=0; i<parts.length; i++) {
            if (newParts[i] !== parts[i]) {
                match = false
                break
            }
        }

        if (match && newParts[parts.length]) {
            fields.push(newParts[parts.length])
        }
    }
    
    return _.uniq(fields)
}

//returns the proper update config to LogicExpandable using prefix
export function getUpdateConfig(prefix, updateRefs) {
    const parts = prefix.split('.')

    for (var ref in updateRefs) {
        const refParts = ref.split('.')

        if (parts.length !== refParts.length) continue

        let match = true
        for (var i=0; i<refParts.length; i++) {
            if (parts[i] !== refParts[i] && refParts[i] !== '$') {
                match = false
                break
            }
        }

        if (match) {
            return updateRefs[ref]
        }
    }

    return null
}