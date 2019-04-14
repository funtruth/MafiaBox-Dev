import React from 'react'

export default function DropSubmit(props) {
    const { icon, onClick, children } = props
    
    return (
        <div className="drop-down-menu-submit" onClick={onClick}>
            {icon && <i className={`drop-down-menu-icon ${icon}`}></i>}
            {children}
        </div>
    )
}