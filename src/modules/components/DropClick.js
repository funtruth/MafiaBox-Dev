import React from 'react'
import { useDispatch } from 'react-redux'
import './DropClick.css'

import { showDropdown } from '../dropdown/DropdownReducer'
import { showModal } from '../modal/ModalReducer'
import { checkForKeys } from '../common/arrows';

const RESERVED_PARAMS = {
    position: "",
}

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

    const check = () => {
        const keys = checkForKeys(params, RESERVED_PARAMS)
        if (keys) {
            console.warn(keys.join(","), "are reserved keys.")
        }
    }

    const handleClick = (e) => {
        if (disabled) return;
        check();

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
        check();

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