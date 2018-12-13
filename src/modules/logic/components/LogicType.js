import React from 'react'
import { dropdownType } from '../../dropdown/types'
import { logicTypeInfo } from '../types'

class LogicType extends React.Component{
    render() {
        const { item, value, field, pageInfo } = this.props
        
        return (
            <i 
                className={`${(value[item].logicType &&
                    logicTypeInfo[value[item].logicType].icon) ||
                    'ion-md-create'} logic-label menu-onclick`}
                menu-type={dropdownType.showLogic}
                field-key={field}
                index-key={item}
                page-key={pageInfo.pageKey}
                style={{
                    backgroundColor: (value[item].logicType &&
                        logicTypeInfo[value[item].logicType].color) ||
                        '#767676',
                    color: '#fff',
                }}
            />
        )
    }
}

export default LogicType