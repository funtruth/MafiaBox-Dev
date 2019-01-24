import React from 'react'
import _ from 'lodash'

import { operatorType } from '../../logic/types'

class PickOperator extends React.Component{
    _renderItem = (item) => {
        const { attach } = this.props
        const chosen = item.key === attach.operatorType

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
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    _select = (item) => {
        const { hoverKey } = this.props
        this.props.updatePage({
            data: {},
            logicType: hoverKey,
            operatorType: item.key,
        })
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