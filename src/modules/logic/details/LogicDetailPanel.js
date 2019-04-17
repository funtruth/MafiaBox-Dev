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
    LogicButton,
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
                dropdown={wasWildcard ? dropdownType.replaceWildcard : dropdown}
                params={{
                    ...params,
                    otherDropdown: dropdown,
                }}
            >
                <LogicButton
                    highlight={hasWildcard ? '#db4757' : color}
                    style={{
                        color: '#999',
                    }}
                >
                    {field}
                    {isLastPanel && <div className="logic-display">{display}</div>}
                </LogicButton>
            </DropClick>
            {!isLastPanel && <Icon className="mdi mdi-chevron-right" color="whitish" size="l"></Icon>}
        </div>
    )
}