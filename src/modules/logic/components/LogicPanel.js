import React from 'react'

import { DropClick, LogicButton } from '../../components/Common';

export default function LogicPanel(props) {
    const {
        pageKey, fieldKey, subfieldKey,
        logicItem,
        vars,
        placeholder,
        dropdown,
        path,
        includeSubpath,
    } = props

    //get data of the logic item
    const data = logicItem.data || {}
    //get data of the logic panel
    const dataProp = (subfieldKey ? data[subfieldKey] : data) || {}

    const { display } = dataProp

    return (
        <DropClick
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
        >
            <LogicButton color={display ? 'white' : 'grey'}>
                {display || placeholder}
            </LogicButton>
        </DropClick>
    )
}