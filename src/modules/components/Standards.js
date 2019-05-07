export function palette(color) {
    switch(color) {
        case 'black':       return '#000'
        case 'blackish':    return '#202225'
        case 'charcoal':    return '#282b30'
        case 'darkgrey':    return '#666'
        case 'grey':        return '#999'
        case 'lightgrey':   return '#bbb'
        case 'whitish':     return '#ddd'
        case 'white':       return '#fff'
        case 'transparent': return 'transparent'

        case 'blue':        return '#18449b'
        case 'purple':      return '#6279CA'
        case 'red':         return '#db4757'
        case 'maroon':      return '#B34B50'
        case 'yellow':      return '#fed766'
        case 'pink':        return '#a566b0'
        case 'violet':      return 'mediumslateblue'
        default:            return color
    }
}

export function value(size) {
    switch(size) {
        case 'z':           return '0px'
        case 'xxs':         return '8px'
        case 'xs':          return '10px'
        case 's':           return '12px'
        case 'm':           return '14px'
        case 'l':           return '16px'
        case 'xl':          return '18px'
        case 'xxl':         return '20px'
        default:            return size
    }
}

export function padding(sizes) {
    if (typeof sizes !== 'object') {
        return console.warn('size needs to be an array[].')
    }

    return value(sizes[0]) + ' ' + value(sizes[1])
}