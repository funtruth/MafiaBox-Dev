import _ from 'lodash'
import { variableType } from './types'

export const VARTYPE_FILTER = (type) => i => {
    if (typeof type === 'object') {
        for (var j=0; j<type.length; j++) {
            if (i && i.variableTypes && i.variableTypes.includes(type[j])) {
                return true
            }
        }
        return false
    } else {
        return i && i.variableTypes && i.variableTypes.includes(type) 
    }
}

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

export const isChildOf = (target, className) => {
    if (!target) return false;
    if (target.classList && target.classList.contains(className)) return target;
    return isChildOf(target.parentElement, className)
}

export function COLLECT_DRAG(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

export function getVarTypeIcon(types) {
    return variableType[types[0]].icon;
}

export function checkForKeys(a, b) {
    var aKeys = Object.keys(a||{});
    var bKeys = Object.keys(b||{});
    var xKeys = _.intersection(aKeys, bKeys)
    return xKeys.length > 0 ? xKeys : '';
}