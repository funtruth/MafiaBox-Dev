import React from 'react'
import { useDispatch } from 'react-redux'
import './DropClick.css'

import { showDropdown } from '../dropdown/DropdownReducer'
import { showModal } from '../modal/ModalReducer'

export default function DropClick(props) {
    const dispatch = useDispatch()
    const {
        onClick,
        onRightClick,
        dropdown,
        modal,
        rightDropdown,
        params,
        place,
        children,
        className,
        disabled,
        style,
    } = props

    const classes = [
        disabled ? 'drop-click-frozen' : 'drop-click',
        className,
    ].join(' ')

    const handleClick = (e) => {
        if (disabled) return;
        if (onClick) {
            onClick(e)
            return;
        }
        if (modal) {
            dispatch(showModal(modal, params))
            return;
        }
        if (dropdown) {
            dispatch(showDropdown(dropdown, e, params, 0, place))
            return;
        }
        console.warn('no modal or dropdownType requested.')
    }

    const handleRightClick = (e) => {
        if (disabled) return;
        if (onRightClick) {
            onRightClick(e)
            return;
        }
        dispatch(showDropdown(rightDropdown, e, params, 0, place))
    }

    return (
        <div
            className={classes}
            onClick={handleClick}
            onContextMenu={handleRightClick}
            style={style}
        >
            {children}
        </div>
    )
}