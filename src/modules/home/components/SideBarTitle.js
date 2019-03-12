import React from 'react'

export default function SideBarTitle(props) {
    return (
        <div className="side-bar-section-title">
            <div style={{
                height: 2,
                width: 10,
                backgroundColor: '#464646',
                marginRight: 2,
            }}/>
            {props.children}
            <div style={{
                height: 2,
                flexGrow: 1,
                backgroundColor: '#464646',
                minWidth: 10,
                marginLeft: 2,
            }}/>
        </div>
    )
}