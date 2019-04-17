import React from 'react'

import { modalType } from '../../modal/types';

import { DropTitle } from '../components/Common';

export default function PickEvent(props) {
    const { attach, subfieldKey } = props

    let handlePress = () => {
        props.showModal(modalType.editEvent, {
            attach: attach[subfieldKey] || {},
        })
        props.showDropdown()
    }

    const value = (attach[subfieldKey] && attach[subfieldKey].value) || {}
    
    return (
        <>
            <DropTitle>options</DropTitle>
            {Object.keys(value).length ?
            <div
                className="drop-down-menu-option"
                onClick={handlePress}
            >
                <i className="drop-down-menu-icon mdi mdi-calendar"/>
                edit events
            </div>
            :<div
                className="drop-down-menu-option"
                onClick={handlePress}
            >
                <i className="drop-down-menu-icon mdi mdi-calendar-plus"/>
                create event
            </div>}
        </>
    )
}