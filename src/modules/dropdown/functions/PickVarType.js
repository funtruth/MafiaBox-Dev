import React, { useState } from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'

export default function PickVarType(props) {
    const [selectedTypes, setSelectedTypes] = useState(props.currentValue)
    const currentValueIsArray = Array.isArray(selectedTypes)

    const handleSelect = item => {
        const updatedTypes = currentValueIsArray ? _.uniq([...selectedTypes, item.key]) : [item.key]
        props.updatePage({
            variableTypes: updatedTypes
        })
        setSelectedTypes(updatedTypes)
    }
    
    return (
        _.toArray(variableType).map(item => {
            const chosen = currentValueIsArray && selectedTypes.includes(item.key)

            return (
                <div
                    key={item.key}
                    className="drop-down-menu-option"
                    chosen={(chosen.toString())}
                    onClick={() => handleSelect(item)}
                >
                    <i className={`${item.icon} drop-down-menu-icon`}/>
                    {item.title}
                    <i className="mdi mdi-check"/>
                </div>
            )
        })
    )
}