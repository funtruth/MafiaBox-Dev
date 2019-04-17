import React from 'react'

import {
    updateType,
} from '../types';
import { dropdownType } from '../../dropdown/types';

import {
    separateField,
    WILD_CHAR,
} from '../proptool';

import {
    Icon,
} from '../../components/Common'

export default function LogicDetailPanel(props) {
    const { params, field, dropdown, color, isLastPanel, currentValue } = props
    const { display } = currentValue
    
    const hasWildcard = isLastPanel &&
        currentValue.updateType === updateType.variable &&
        separateField(currentValue.value).includes(WILD_CHAR)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <div
                className="logic-button app-onclick"
                menu-type={hasWildcard ? dropdownType.replaceWildcard : dropdown}
                app-onclick-props={JSON.stringify({
                    ...params,
                    otherDropdown: dropdown,
                })}
                style={{
                    color: '#999',
                    borderLeft: `4px solid ${hasWildcard ? '#db4757' : color}`,
                }}
            >
                {field}
                {isLastPanel && <div className="logic-display">{display}</div>}
            </div>
            {!isLastPanel && <Icon className="mdi mdi-chevron-right" color="whitish" size="l"></Icon>}
        </div>
    )
}