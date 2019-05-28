import React from 'react'
import _ from 'lodash'

import { APP_PALETTE } from '../../components/Standards'

import StringColorDrag from '../dnd/StringColorDrag';

export default function StringColorPicker(props) {
    const colors = _.toArray(APP_PALETTE)

    return (
        <div className="event-color-picker">
            <div className="dashboard-section-title">Text Color</div>
            <div className="row"> 
                {colors.map(item => (
                    <StringColorDrag
                        {...props}
                        key={item}
                        item={item}
                    />
                ))}
            </div>
        </div>
    )
}