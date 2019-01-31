import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'

class PickVarType extends React.Component{
    _select = (item) => {
        this.props.updatePage({variableType: item.key})
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props

        const chosen = typeof currentValue === 'string' && currentValue === item.key
        
        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    render() {
        return (
            _.toArray(variableType).map(this._renderItem)
        )
    }
}

export default PickVarType