import {
    returnType,
} from './types'

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