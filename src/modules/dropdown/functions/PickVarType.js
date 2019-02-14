import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'

class PickVarType extends React.Component{
    render() {
        const { currentValue } = this.props
        const currentValueIsArray = Array.isArray(currentValue)

        const handleSelect = item => {
            this.props.updatePage({
                variableTypes: currentValueIsArray ? _.uniq([...currentValue, item.key]) : [item.key]
            })
        }//TODO DROPDOWNS NEED TO LIVE UPDATE

        return (
            _.toArray(variableType).map(item => {
                const chosen = currentValueIsArray && currentValue.includes(item.key)

                return (
                    <div
                        key={item.key}
                        className="drop-down-menu-option"
                        chosen={chosen.toString()}
                        onClick={handleSelect.bind(this, item)}
                    >
                        <i className={`${item.icon} drop-down-menu-icon`}/>
                        {item.title}
                        <i className="mdi mdi-check"/>
                    </div>
                )
            })
        )
    }
}

export default PickVarType