import React from 'react'
import _ from 'lodash'
import { variableType } from '../../../logic/types';
import EventVarDrag from './EventVarDrag';

export default function EventVarPicker(props) {
    const { vars } = props
    const allowedVars = _.filter(vars, i => i.variableTypes && 
        (i.variableTypes.includes(variableType.string.key)||
        i.variableTypes.includes(variableType.number.key) ||
        i.variableTypes.includes(variableType.uid.key)))

    return (
        <div className="event-color-picker">
            {allowedVars.map(item => (
                <EventVarDrag
                    key={item.key}
                    item={item}
                />
            ))}       
        </div>
    )
}