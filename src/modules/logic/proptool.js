import _ from 'lodash'

//returns properties of prefix existing in updateRef
export function getSubfields(prefix, updateRef) {
    const parts = prefix.split('.')
    let fields = []
    
    for (var key in updateRef) {
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

//replaces all $player properties with the appropriate properties
//this allows the player properties in playerRef to exist in a single location
export function addPlayerRef({updateRef, playerRef}) {
    let updateRefClone = Object.assign({}, updateRef)

    for (var ref in updateRefClone) {
        let refParts = ref.split('.')

        if (refParts[refParts.length - 1] === '$player') {
            refParts.pop()
            delete updateRefClone[ref]

            const prefix = refParts.join('.')
            for (var playerProp in playerRef) {
                updateRefClone[`${prefix}.${playerProp}`] = playerRef[playerProp]
            }

        }
    }

    return updateRefClone
}