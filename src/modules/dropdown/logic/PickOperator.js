import React from 'react'
import _ from 'lodash'

import { logicType, operatorType } from '../../logic/types'

class PickOperator extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const chosen = item.key === currentValue

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
                style={{
                    backgroundColor: chosen && item.color,
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _select = (item) => {
        let update = {}
        update.logicType = this.props.logicType
        update.operatorType = item.key

        switch(this.props.logicType) {
            case logicType.operator.key:
            case logicType.update.key:
            case logicType.return.key:
                update.data = {}
                break
            default:
                update.data = ''
        }
        
        this.props.updatePage(update)
        this.props.showDropdown()
    }

    render() {
        const data = _.orderBy(operatorType, i => i.index)

        return (
            <div>
                {data.map(this._renderItem)}
            </div>
        )
    }
}

export default PickOperator