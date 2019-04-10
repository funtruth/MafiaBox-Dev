import React from 'react'

export default function DropItem(props) {
    const { leftIcon, rightIcon, onClick, children, chosen } = props
    const chosenToString = chosen ? "true" : "false"
    
    return (
        <div className="drop-down-menu-option" onClick={onClick} chosen={chosenToString}>
            {leftIcon && <i className={`drop-down-menu-icon ${leftIcon}`}></i>}
            {children}
            {rightIcon && <i className={`drop-down-menu-icon ${rightIcon}`} style={{marginLeft: 'auto'}}></i>}
        </div>
    )
}