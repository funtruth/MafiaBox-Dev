import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { logicType, operatorType, DEFAULT_LOGIC } from '../types'

export default function LogicType(props) {
    const { value, path, subpath, updateSource } = props
    const {
        operatorType: selectedOperator,
        logicType: selectedLogic,
    } = value
    
    const item = selectedOperator ?
        operatorType[selectedOperator]
        :(selectedLogic ? logicType[selectedLogic] : {})
    
    let handleAdd = () => {
        props.updatePage(path, {
            down: {
                ...DEFAULT_LOGIC,
                down: value.down,
            },
        })
    }

    return (
        <div>
            <i 
                className={`${item.icon || 'ion-md-create'} logic-label app-onclick`}
                menu-type={dropdownType.pickLogic}
                app-onclick-props={JSON.stringify({
                    attach: value,
                    updateSource,
                    path,
                    subpath,
                })}
                style={{
                    backgroundColor: item.color || '#767676',
                }}
            />
            <i 
                className="logic-option mdi mdi-server-plus"
                onClick={handleAdd}
            />
        </div>
    )
}