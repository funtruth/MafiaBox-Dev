import React from 'react'

import { DropClick, LogicButton } from '../../components/Common';

export default function LogicPanel(props) {
    const {
        pageKey, fieldKey, subfieldKey,
        logicItem,
        vars,
        placeholder,
        dropdown,
        modal,
        path,
        includeSubpath,
    } = props

    //get data of the logic item
    const data = logicItem.data || {}
    //get data of the logic panel
    const dataProp = (subfieldKey ? data[subfieldKey] : data) || {}

    const { display } = dataProp

    if (pageKey ) console.warn('pageKey is being used here.', logicItem)
    if (fieldKey) console.warn('fieldKey is being used here.', logicItem)

    return (
        <DropClick
            dropdown={dropdown}
            modal={modal}
            params={{
                pageKey,
                fieldKey,
                subfieldKey,
                currentValue: dataProp,
                attach: data,
                attachVar: vars,
                logicItem,
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