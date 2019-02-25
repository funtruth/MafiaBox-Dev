import React from 'react'
import { dropdownType } from '../../dropdown/types'
import { logicType, operatorType } from '../types'

export default function LogicType(props) {
    const { indexKey, logicInfo, fieldKey, pageKey, path, updateSource } = props
    const {
        operatorType: selectedOperator,
        logicType: selectedLogic,
    } = logicInfo
    
    const item = selectedOperator ? operatorType[selectedOperator] : selectedLogic ? logicType[selectedLogic] : {}
    
    return (
        <i 
            className={`${item.icon || 'ion-md-create'} logic-label app-onclick`}
            menu-type={dropdownType.pickLogic}
            app-onclick-props={JSON.stringify({
                pageKey,
                fieldKey,
                indexKey,
                attach: logicInfo,
                updateSource,
                path,
            })}
            style={{
                backgroundColor: item.color || '#767676',
                color: '#fff',
                width: 18,
                borderRadius: '4px 0px 0px 4px',
            }}
        />
    )
}