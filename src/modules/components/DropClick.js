import React from 'react'
import { connect } from 'react-redux'

import { showDropdown } from '../dropdown/DropdownReducer'

export default connect(
    null,
    {
        showDropdown,
    }
)(function DropClick(props) {
    const {
        dropdown,
        params,
        showDropdown,
        place,
        children,
        className,
        style,
    } = props

    const classes = [
        'drop-click',
        className,
    ].join(' ')

    const handleClick = (e) => {
        showDropdown(dropdown, e, params, 0, place)
    }

    return (
        <div className={classes} onClick={handleClick} style={style}>
            {children}
        </div>
    )
})