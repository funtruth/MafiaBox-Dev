import _ from 'lodash'

export function updateHistory(history, key) {
    let r = _.filter(history, i => i !== key)
    return [ key, ...r ]
}

export function genUID(key) {
    return `${key}-xxxxxxxx`.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}