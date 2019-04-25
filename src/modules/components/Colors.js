export function palette(color) {
    switch(color) {
        case 'black':       return '#000'
        case 'blackish':    return '#202225'
        case 'darkgrey':    return '#666'
        case 'grey':        return '#999'
        case 'lightgrey':   return '#bbb'
        case 'whitish':     return '#ddd'
        case 'white':       return '#fff'
        case 'transparent': return 'transparent'
        case 'blue':        return '#18449b'
        case 'red':         return '#db4757'
        case 'pink':        return '#a566b0'
        default:            return color
    }
}