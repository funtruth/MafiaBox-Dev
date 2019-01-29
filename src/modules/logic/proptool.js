import _ from 'lodash'

//returns properties of prefix existing in updateRef
export function getSubfields(prefix, updateRef) {
    const parts = prefix.split('.').filter(i => i !== "")
    let fields = []
    for (var key in updateRef) {
        const newParts = key.split('.')
        let match = true

        if (newParts.length <= parts.length) continue

        for (var i=0; i<parts.length; i++) {
            if (newParts[i] !== parts[i] && newParts[i] !== '$') {
                match = false
                break
            }
        }

        if (match) {
            fields.push({
                ...updateRef[key],
                subfield: newParts[parts.length]
            })
        }
    }
    
    return _.uniqBy(fields, i => i.subfield)
}

//returns the proper update config to LogicExpandable using prefix
export function getUpdateConfig(prefix, updateRef) {
    const parts = prefix.split('.')

    for (var ref in updateRef) {
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
            return updateRef[ref]
        }
    }

    return null
}