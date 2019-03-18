export function unnormalize(object) {
    let results = {}

    for (var key in object) {
        Object.assign(results, object[key].byId)
    }

    return results
}