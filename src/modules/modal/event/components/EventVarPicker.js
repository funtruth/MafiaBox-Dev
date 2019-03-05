import React from 'react'
import _ from 'lodash'
import { variableType } from '../../../logic/types';
import EventVarDrag from './EventVarDrag';

export default function EventVarPicker(props) {
    const { vars } = props
    const uids = _.filter(vars, i => i.variableTypes &&  i.variableTypes.includes(variableType.uid.key))
    const numbers = _.filter(vars, i => i.variableTypes &&  i.variableTypes.includes(variableType.number.key))
    const strings = _.filter(vars, i => i.variableTypes &&  i.variableTypes.includes(variableType.string.key))

    return (
        <div className="event-var-picker">
            <div className="event-var-section">
                <div className="dashboard-section-title">Strings</div>
                <div className="row">
                    {strings.map(item => (
                        <EventVarDrag
                            key={item.key}
                            item={item}
                        />
                    ))}
                </div>
            </div>
            <div className="-sep"></div>
            <div className="event-var-section">
                <div className="dashboard-section-title">Numbers</div>
                <div className="row">
                    {numbers.map(item => (
                        <EventVarDrag
                            key={item.key}
                            item={item}
                        />
                    ))}
                </div>
            </div>
            <div className="-sep"></div>
            <div className="event-var-section">
                <div className="dashboard-section-title">Uids</div>
                <div className="row">
                    {uids.map(item => (
                        <EventVarDrag
                            key={item.key}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}