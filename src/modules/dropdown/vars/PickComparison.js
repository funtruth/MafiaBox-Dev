import React from 'react'
import _ from 'lodash'

import { comparisonType } from '../../logic/types'
import DropTitle from '../components/DropTitle';

class PickComparison extends React.Component{
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
                {chosen ?
                    <i className="mdi mdi-check"/>
                    :<div style={{ width: 20, marginLeft: 'auto' }}/>
                }
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