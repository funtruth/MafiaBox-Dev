import React from 'react'
import _ from 'lodash'

import { comparisonType } from '../../logic/types'
import DropTitle from '../components/DropTitle';

class PickComparison extends React.Component{
    _renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof selectedKey === 'string' && selectedKey === item.key

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

    _select = (item) => {
        this.props.updatePage(item)
        this.props.showDropdown()
    }

    render() {
        return (
            <div>
                <DropTitle>pick comparison</DropTitle>
                {_.toArray(comparisonType).map(this._renderItem)}
            </div>
        )
    }
}

export default PickComparison