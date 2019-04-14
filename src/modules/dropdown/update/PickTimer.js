import React, { useState } from 'react'

import {
    updateType,
    VAR_DEFAULTS,
} from '../../logic/types'

import DropTitle from '../components/DropTitle';

export default function PickTimer(props) {
    const { attach, subfieldKey } = props
    const currentValue = attach[subfieldKey] || {}
    
    const timer = currentValue.value || 0

    const [min, setMin] = useState(Math.floor(timer / 60 / 1000))
    const [sec, setSec] = useState(timer % 60000 / 1000)

    const onMin = (e) => setMin(e.target.value)
    const onSec = (e) => setSec(e.target.value)

    const onFocus = () => {
        if (sec > 60) {
            setMin(min + Math.floor(sec / 60))
            setSec(sec % 60)
        }
    }

    const onSave = () => {
        const timer = (60 * parseInt(min) + parseInt(sec)) * 1000
        
        props.updatePage({
            ...VAR_DEFAULTS,
            update: true,
            value: timer,
            display: min + 'm' + sec + 's',
            updateType: updateType.timer,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>set a timer</DropTitle>
            <div className="row" style={{ justifyContent: 'center' }}>
                <input
                    className="field-time-input border-right"
                    value={min}
                    placeholder="00m"
                    type="number"
                    onChange={onMin}
                    onFocus={onFocus}
                />
                <input
                    className="field-time-input"
                    value={sec}
                    placeholder="00s"
                    type="number"
                    onChange={onSec}
                    onFocus={onFocus}
                />
            </div>
            <div className="-sep"/>
            <div
                className="drop-down-menu-option"
                onClick={onSave}
            >
                <i className="drop-down-menu-icon mdi mdi-content-save"/>
                save
            </div>
        </>
    )
}