import { variableType } from '../logic/types'

export const VARTYPE_FILTER = (type) => i =>  i && i.variableTypes && i.variableTypes.includes(type) 

export const VARTYPE_IS_NUM = i => i && i.variableTypes && i.variableTypes.includes(variableType.number.key)
export const VARTYPE_IS_STR = i => i && i.variableTypes && i.variableTypes.includes(variableType.string.key)
export const VARTYPE_IS_BOOL = i => i && i.variableTypes && i.variableTypes.includes(variableType.boolean.key)
export const VARTYPE_IS_UID = i => i && i.variableTypes && i.variableTypes.includes(variableType.uid.key)
export const VARTYPE_IS_OBJ = i => i && i.variableTypes && i.variableTypes.includes(variableType.object.key)
export const VARTYPE_IS_UID_OBJ = i => i && i.variableTypes && i.variableTypes.includes(variableType.uidObject.key)