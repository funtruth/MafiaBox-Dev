import React from 'react'

export default function EmptyGridComponent({className, onClick, text}) {
    return (
        <div className={`empty-grid-item ${className}`} onClick={onClick}>
            <i className="mdi mdi-plus" style={{ fontSize: 50 }}></i>
            {text}
            <div style={{ height: 10 }}/>
        </div>
    )
}