import React from 'react'

export default function DropItem(props) {
    const { leftIcon, rightIcon, onClick, children, chosen } = props

    return (
        <div className="drop-down-menu-option" onClick={onClick} chosen={chosen}>
            {leftIcon && <i className={`drop-down-menu-icon ${leftIcon}`}></i>}
            {children}
            {rightIcon && <i className={`drop-down-menu-icon ${rightIcon}`}></i>}
        </div>
    )
}