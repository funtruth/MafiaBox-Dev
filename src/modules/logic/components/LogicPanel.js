import React from 'react'

import { DropClick } from '../../components/Common';

export default function LogicPanel(props) {
    const {
        pageKey, fieldKey, subfieldKey,
        value, //logic item
        vars,
        placeholder,
        dropdown,
        path,
        includeSubpath,
    } = props

    //get data of the logic item
    const data = value.data || {}
    //get data of the logic panel
    const dataProp = (subfieldKey ? data[subfieldKey] : data) || {}

    const { display } = dataProp

    return (
        <DropClick
            className="logic-button"
            dropdown={dropdown}
            params={{
                pageKey,
                fieldKey,
                subfieldKey,
                currentValue: dataProp,
                attach: data,
                attachVar: vars,
                path,
                ignoreSubpath: !includeSubpath,
            }}
            style={{
                color: display ? '#fff' : '#868686',
            }}
        >
            <div className="text-ellipsis">{display || placeholder}</div> 
        </DropClick>
    )
}