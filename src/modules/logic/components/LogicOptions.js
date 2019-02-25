import React from 'react'
import { dropdownType } from '../../dropdown/types'

export default function LogicOptions(props) {
    const { indexKey, logicInfo, fieldKey, pageKey, path, updateSource } = props

    return (
        <i 
            className="mdi mdi-dots-horizontal logic-label app-onclick"
            menu-type={dropdownType.showLogicOptions}
            app-onclick-props={JSON.stringify({
                pageKey,
                fieldKey,
                indexKey,
                attach: logicInfo,
                updateSource,
                path,
            })}
            style={{
                backgroundColor: '#767676',
                color: '#fff',
                width: 18,
                borderRadius: '0px 4px 4px 0px',
            }}
        />
    )
}