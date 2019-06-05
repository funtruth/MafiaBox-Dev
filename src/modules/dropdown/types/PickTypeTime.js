import React, { useState } from 'react'

import { parseType, variableType } from '../../logic/types';
import { LOGIC_ITEM_VAR } from '../../common/defaults'

import { DropTitle, DropSubmit } from '../components/Common';
import Row from '../../components/Row';

export default function PickTypeTime({
    slate,
    update,
    showDropdown,
}){
    const [min, setMin] = useState(slate.value ? Math.floor(slate.value / 60 / 1000) : 0)
    const [sec, setSec] = useState(slate.value ? slate.value % 60000 / 1000 : 0)

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
        
        update({
            ...LOGIC_ITEM_VAR,
            value: timer,
            display: parseInt(min) + 'm' + parseInt(sec) + 's',
            parseBy: parseType.constant,
            variableTypes: [variableType.time.key],
        })
        showDropdown();
    }

    return (
        <>
            <DropTitle>set a timer</DropTitle>
            <Row>
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
                <DropSubmit onClick={onSave}/>
            </Row>
        </>
    )
}