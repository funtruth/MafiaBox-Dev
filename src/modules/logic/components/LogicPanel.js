import React from 'react'

export default function LogicPanel(props) {
    const {
        pageKey, fieldKey, indexKey, subfieldKey,
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

    return (
        <div
            className="logic-button app-onclick"
            menu-type={dropdown}
            app-onclick-props={JSON.stringify({
                pageKey,
                fieldKey,
                indexKey,
                subfieldKey,
                currentValue: dataProp,
                attach: data,
                attachVar: vars,
                path,
                ignoreSubpath: !includeSubpath,
            })}
            style={{
                color: dataProp.display ? '#fff' : '#868686',
            }}
        >
            <div className="text-ellipsis">
                {dataProp.display || placeholder}
            </div> 
        </div>
    )
}