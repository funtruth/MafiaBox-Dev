import React from 'react'

export default function DropItem(props) {
    const { leftIcon, rightIcon, onClick, children } = props

    return (
        <div className="drop-down-menu-option" onClick={onClick}>
            {leftIcon && <i className={`drop-down-menu-icon ${leftIcon}`}></i>}
            {children}
            {rightIcon && <i className={`drop-down-menu-icon ${rightIcon}`}></i>}
        </div>
    )
}