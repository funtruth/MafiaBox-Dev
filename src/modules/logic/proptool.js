import _ from 'lodash'

//library refers to the data object in the logic item
export function getSubfields(prefix, library) {
    const parts = prefix.split('.')
    let fields = []
    
    for (var key in library) {
        const newParts = key.split('.')
        let match = true

        for (var i=0; i<parts.length; i++) {
            if (newParts[i] !== parts[i] && newParts[i] !== '$') {
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