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
    DropClick,
    Icon,
} from '../../components/Common'

export default function LogicDetailPanel(props) {
    const { params, field, dropdown, color, isLastPanel, currentValue } = props
    const { display } = currentValue
    
    const wasWildcard = isLastPanel && currentValue.wildcardValue
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
            <DropClick
                className="logic-button"
                dropdown={wasWildcard ? dropdownType.replaceWildcard : dropdown}
                params={{
                    ...params,
                    otherDropdown: dropdown,
                }}
                style={{
                    color: '#999',
                    borderLeft: `4px solid ${hasWildcard ? '#db4757' : color}`,
                }}
            >
                {field}
                {isLastPanel && <div className="logic-display">{display}</div>}
            </DropClick>
            {!isLastPanel && <Icon className="mdi mdi-chevron-right" color="whitish" size="l"></Icon>}
        </div>
    )
}