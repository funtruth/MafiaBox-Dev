import _ from 'lodash'

//receives new info{} and returns new roles[], overwriting old info
export function saveRoleInfo(newInfo, roles) {
    let rolesNoDupes = _.filter(roles, i => i.roleId !== newInfo.roleId)
    return [ newInfo, ...rolesNoDupes ]
}

export function updateHistory(history, key) {
    let r = _.filter(history, i => i !== key)
    return [ key, ...r ]
}