import React from 'react'

export default function DropItem(props) {
    const { leftIcon, rightIcon, rightCheck, onClick, text, chosen } = props
    const chosenToString = chosen ? "true" : "false"

    const handleClick = (e) => {
        onClick && onClick();
        e.stopPropagation();
    }

    if (rightIcon && rightCheck) {
        console.warn('both rightIcon and rightCheck are being used, this is probably not on purpose.')
    }
    
    return (
        <div className="drop-down-menu-option" onClick={handleClick} chosen={chosenToString}>
            {leftIcon && <i className={`drop-down-menu-icon ${leftIcon}`} style={{marginRight: 5}}></i>}
            {text}
            {rightCheck && <i className="drop-down-menu-icon mdi mdi-check" style={{marginLeft: 'auto'}}></i>}
            {rightIcon && <i className={`drop-down-menu-icon ${rightIcon}`} style={{marginLeft: 'auto'}}></i>}
        </div>
    )
}