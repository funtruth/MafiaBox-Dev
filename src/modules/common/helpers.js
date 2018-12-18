export function genUID(key) {
    return `${key}-xxxx`.replace(/[xy]/g, function(c) {
        // eslint-disable-next-line
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//updates a property deep inside an object and returns the entire object
export function pathUpdate(args, index, repo) {
    return {
        ...repo[args[index]]||{},
        [args[index + 1]]: index===args.length-3?args[args.length-1]:pathUpdate(args, index+1, repo[args[index]])
    }
}