import React, { useState } from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'
import DropTitle from '../components/DropTitle';

export default function PickVarType(props) {
    const [selectedTypes, setSelectedTypes] = useState(props.currentValue)
    const currentValueIsArray = Array.isArray(selectedTypes)

    const handleSelect = item => {
        let updatedTypes;

        if (currentValueIsArray && selectedTypes.includes(item.key)) {
            updatedTypes = _.remove(selectedTypes, i => i !== item.key)
        } else {
            updatedTypes = currentValueIsArray ? _.uniq([...selectedTypes, item.key]) : [item.key]
        }

        props.updatePage({
            variableTypes: updatedTypes,
        })
        setSelectedTypes(updatedTypes)
    }
    
    return (
        <>
            <DropTitle>variable types</DropTitle>
            {_.toArray(variableType).map(item => {
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
            })}
        </>
    )
}