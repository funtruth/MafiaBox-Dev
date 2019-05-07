import { variableType } from '../logic/types'

export const VARTYPE_FILTER = (type) => i =>  i && i.variableTypes && i.variableTypes.includes(type) 

export const VARTYPE_IS_NUM = i => i && i.variableTypes && i.variableTypes.includes(variableType.number.key)
export const VARTYPE_IS_STR = i => i && i.variableTypes && i.variableTypes.includes(variableType.string.key)
export const VARTYPE_IS_BOOL = i => i && i.variableTypes && i.variableTypes.includes(variableType.boolean.key)
export const VARTYPE_IS_UID = i => i && i.variableTypes && i.variableTypes.includes(variableType.uid.key)
export const VARTYPE_IS_OBJ = i => i && i.variableTypes && i.variableTypes.includes(variableType.object.key)
export const VARTYPE_IS_UID_OBJ = i => i && i.variableTypes && i.variableTypes.includes(variableType.uidObject.key)

//stop DropClick propagation
export const STOP_DROP_PROP = e => e.target.classList.contains('drop-click')

export const IS_PUBLISHED = (key, repo) => {
    if (!key || !repo) return console.warn('invalid arguments.')
    return !!(repo[key] && repo[key].publishInfo && repo[key].publishInfo.published)
}