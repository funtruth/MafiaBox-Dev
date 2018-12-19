import React from 'react'
import { dropdownType } from '../../dropdown/types'
import { logicType } from '../types'

class LogicType extends React.Component{
    render() {
        const { item, logicInfo, field, pageInfo } = this.props
        const type = logicInfo.logicType

        return (
            <i 
                className={`${(type && logicType[type].icon) ||
                    'ion-md-create'} logic-label menu-onclick`}
                menu-type={dropdownType.showLogic}
                field-key={field}
                index-key={item}
                page-key={pageInfo.pageKey}
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