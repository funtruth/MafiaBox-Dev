import React from 'react'
import { connect } from 'react-redux'

import { comparisonType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

class PickComparison extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props

        const chosen = typeof currentValue === 'string' && currentValue === item

        const itemStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
                style={itemStyle}
            >
                {comparisonType[item].title}
                {chosen ?
                    <i className="ion-md-checkmark"/>
                    :<div style={{ width: 20, marginLeft: 'auto' }}/>
                }
            </div>
        )
    }

    _select = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props

        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, value)
        this.props.showDropdown()
    }

    render() {
        return (
            Object.keys(comparisonType).map(this._renderItem)
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
    }
)(PickComparison)