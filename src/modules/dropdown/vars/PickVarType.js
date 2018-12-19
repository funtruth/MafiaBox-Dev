import React from 'react'
import { connect } from 'react-redux'

import { variableType } from '../../logic/types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickVarType extends React.Component{
    _renderItem = (item) => {
        const { dropdownParams } = this.props
        const { currentValue } = dropdownParams

        const selected = typeof currentValue === 'string' && currentValue === item
        
        let itemStyle = {}
        itemStyle = {
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
                <i
                    className={`${variableType[item].icon} drop-down-menu-icon`}
                />
                {variableType[item].title}
                {selected ? <i
                    className="ion-md-checkmark"
                    style={{ marginLeft: 'auto', width: 30, textAlign: 'center' }}
                />:<div style={{ width: 30, marginLeft: 'auto' }}/>}
            </div>
        )
    }

    _select = (newValue) => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey } = dropdownParams
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'variableType', newValue)
        this.props.showDropdownByKey()
    }

    render() {
        return (
            Object.keys(variableType).map(this._renderItem)
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
)(PickVarType)