import React from 'react';

const getAlign = (align) => {
    switch(align) {
        case 'c':   return 'center'
        case 'r':   return 'flex-end'
        default:    return 'flex-start'
    }
}

const getFontSize = (size) => {
    switch(size) {
        case 'xs':          return 12
        case 's':           return 14
        case 'l':           return 18
        case 'xl':          return 21
        case 'xxl':         return 25
        default:            return 16 //'m'
    }
}

const getPaddingBottom = (size) => {
    switch(size) {
        case 'xs':          return 2
        case 's':           return 2
        case 'l':           return 3
        case 'xl':          return 4
        case 'xxl':         return 4
        default:            return 2 //'m'
    }
}

const getColor = (color) => {
    switch(color) {
        case 'darkgrey':    return '#666'
        case 'grey':        return '#999'
        case 'lightgrey':   return '#bbb'
        case 'whitish':     return '#ddd'
        default:            return '#fff'
    }
}

export default function Text(props) {
    const {
        children,
        bold,
        underline,
        align = "",
        className = "",
        size = 'medium',
        color = '#fff',
        styles,
    } = props

    const textStyle = {
        fontWeight: bold ? 700 : 500,
        fontSize: getFontSize(size),
        fontFamily: 'Segoe UI',
        letterSpacing: -0.4,
        alignSelf: getAlign(align),
        paddingBottom: getPaddingBottom(size),
        color: getColor(color),
        ...styles,
    }

    const classes = [
        underline ? '--text-underline' : '',
        className,
    ].join(" ")
    
    return (
        <div className={classes} style={textStyle}>
            {children}
        </div>
    )
}