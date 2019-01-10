import React from 'react'
import { dropdownType } from '../../dropdown/types'
import { logicType } from '../types'

class LogicType extends React.Component{
    render() {
        const { item, logicInfo, fieldKey, pageKey } = this.props
        const type = logicInfo.logicType

        return (
            <i 
                className={`${(type && logicType[type].icon) ||
                    'ion-md-create'} logic-label app-onclick`}
                menu-type={dropdownType.showLogic}
                field-key={fieldKey}
                index-key={item}
                page-key={pageKey}
                current-value={type}
                style={{
                    backgroundColor: (type && logicType[type].color) ||
                        '#767676',
                    color: '#fff',
                }}
            />
        )
    }
}

export default LogicType