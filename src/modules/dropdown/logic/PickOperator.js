import React from 'react'
import _ from 'lodash'

import { operatorType } from '../../logic/types'
import DropTitle from '../components/DropTitle';

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
        const { hoverKey } = this.props
        
        const data = _(operatorType)
            .filter(i => i.logicType === hoverKey)
            .orderBy(i => i.index)
            .value()

        return (
            <div>
                <DropTitle>operator types</DropTitle>
                {data.map(this._renderItem)}
            </div>
        )
    }
}

export default PickOperator