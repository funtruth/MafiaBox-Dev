export const APP_PALETTE = {
    transparent:'transparent',
    black:      '#000',
    blackish:   '#202225',
    charcoal:   '#282b30',
    discord:    '#363940',
    darkgrey:   '#666',
    grey:       '#999',
    lightgrey:  '#bbb',
    whitish:    '#ddd',
    white:      '#fff',
    active:     '#705772',
    blue:       '#18449b',
    purple:     '#6279CA',
    darkpurple: '#240041',
    red:        '#db4757',
    darkred:    '#900048',
    maroon:     '#B34B50',
    yellow:     '#EA9A19',
    pink:       '#a566b0',
    orange:     '#D64F31',
    rabbit:     '#F1ECC8',
    green:      '#4BAC88',
    turquoise:  '#085f63',
    violet:     '#7b68ee',

}

export function palette(color) {
    return APP_PALETTE[color] || color
}

export function value(size) {
    switch(size) {
        case 'z':           return '0px'
        case 'xxs':         return '6px'
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

export function alignX(align) {
    switch(align) {
        case 'l':           return 'flex-start'
        case 'r':           return 'flex-end'
        case 'c':           return 'center'
        case 's':           return 'stretch'
        default:            return ''
    }
}

export function justifyY(justify) {
    switch(justify) {
        case 't':           return 'flex-start'
        case 'b':           return 'flex-end'
        case 'c':           return 'center'
        case 's':           return 'stretch'
        default:            return ''
    }
}