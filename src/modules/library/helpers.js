import _ from 'lodash'

export function updateHistory(history, key) {
    let r = _.filter(history, i => i !== key)
    return [ key, ...r ]
}

export function deleteRole(state) {
    let roleId = state.roleInfoWorkspace.roleId
    let history = _.filter(state.history, i => i !== roleId)
    let roles = state.roles

    delete roles[roleId]

    return {
        history,
        roles,
    }
}