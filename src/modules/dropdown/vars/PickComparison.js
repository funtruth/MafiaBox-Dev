import React from 'react'
import { connect } from 'react-redux'

import { comparisonType } from '../../logic/types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickComparison extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props

        const selected = typeof currentValue === 'string' && currentValue === item

        const itemStyle = {
            color: selected ? '#fff' : '#b6b6b6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
                style={itemStyle}
            >
                {comparisonType[item].title}
                {selected ? <i
                    className="ion-md-checkmark"
                    style={{ marginLeft: 'auto', width: 30, textAlign: 'center' }}
                />:<div style={{ width: 30, marginLeft: 'auto' }}/>}
            </div>
        )
    }

    _select = (value) => {
        const { pageKey, fieldKey, subfieldKey, indexKey } = this.props

        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, value)
        this.props.showDropdownByKey()
    }

    render() {
        return (
            Object.keys(comparisonType).map(this._renderItem)
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        updatePageByPath,
        showDropdownByKey,
    }
)(PickComparison)