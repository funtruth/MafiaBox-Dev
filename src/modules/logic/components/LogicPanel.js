import React from 'react'

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
        <div
            className="logic-button app-onclick"
            menu-type={dropdown}
            app-onclick-props={JSON.stringify({
                pageKey,
                fieldKey,
                subfieldKey,
                currentValue: dataProp,
                attach: data,
                attachVar: vars,
                logicItem: value,
                path,
                ignoreSubpath: !includeSubpath,
            })}
            style={{
                color: display ? '#fff' : '#868686',
            }}
        >
            <div className="text-ellipsis">{display || placeholder}</div> 
        </div>
    )
}