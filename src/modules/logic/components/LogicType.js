import React from 'react'

import { dropdownType } from '../../dropdown/types'
import { logicType, operatorType, DEFAULT_LOGIC } from '../types'

import Icon from '../../components/Icon';

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
        props.updatePage([...path, 'down'], {
            ...DEFAULT_LOGIC,
            down: value.down,
        })
    }

    return (
        <div className="column" style={{alignItems: 'center'}}>
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
                    borderLeft: `4px solid ${item.color || '#767676'}`,
                }}
            />
            <Icon className="mdi mdi-server-plus" size="l" color="grey" hover onClick={handleAdd}></Icon>
        </div>
    )
}