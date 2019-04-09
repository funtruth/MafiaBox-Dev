import {
    numUpdateType,
    returnType,
} from './types'

import {
    presentVariable,
} from './proptool'

//PickNumUpdate
export function codeNumUpdate(item, field) {
    const { value, adjust } = item
    const fieldJS = presentVariable(field)
    
    switch(value) {
        case numUpdateType.setTo.key:
            return adjust
        case numUpdateType.incr.key:
            return fieldJS + '+1'
        case numUpdateType.incrBy.key:
            return fieldJS + '+' + adjust
        case numUpdateType.decr.key:
            return fieldJS + '-1'
        case numUpdateType.decrBy.key:
            return fieldJS + '-' + adjust
        default:
            console.warn('case does not exist. codeNumUpdate, logic/types', value)
            return ""
    }
}

//PickReturnType
export function codeReturnType(key) {
    switch(key) {
        case returnType.true.key:
            return 'return true'
        case returnType.false.key:
            return 'return false'
        case returnType.push.key:
            return 'return write.db.update(write.updates)'
        default:
            console.warn('case does not exist. codeReturnType, logic/types', key)
            return ""
    }
}