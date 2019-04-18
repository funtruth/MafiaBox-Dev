import React from 'react'

export default function DropItem(props) {
    const { leftIcon, rightIcon, onClick, text, chosen } = props
    const chosenToString = chosen ? "true" : "false"

    const handleClick = (e) => {
        onClick && onClick();
        e.stopPropagation();
    }
    
    return (
        <div className="drop-down-menu-option" onClick={handleClick} chosen={chosenToString}>
            {leftIcon && <i className={`drop-down-menu-icon ${leftIcon}`}></i>}
            {text}
            {rightIcon && <i className={`drop-down-menu-icon ${rightIcon}`} style={{marginLeft: 'auto'}}></i>}
        </div>
    )
}