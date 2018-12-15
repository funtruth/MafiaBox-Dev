import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updateDeepPage } from '../../page/PageReducer'

import { valueType } from '../../logic/types'

class PickUpdate extends React.Component{
    _renderItem = (item) => {
        const { dropdownData } = this.props
        
        let selected = false
        if (typeof dropdownData === 'string') selected = dropdownData === item

        let itemStyle = {}
        selected && (itemStyle = {
            color: selected ? '#fff' : '#b6b6b6',
        })
        
        return (
            <div
                key={item}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
                style={itemStyle}
            >
                <i
                    className={`${valueType[item].icon} drop-down-menu-icon`}
                />
                {valueType[item].title}
                {selected && <i
                    className="ion-md-checkmark"
                    style={{
                        marginLeft: 'auto',
                        width: 30,
                        textAlign: 'center',
                    }}
                />}
            </div>
        )
    }

    _select = (newValue) => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey, subfieldKey } = dropdownParams
        
        this.props.updateDeepPage(pageKey, fieldKey, indexKey, 'data', subfieldKey, 'value', newValue)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        let items = [
            valueType.nC.key,
            valueType.null.key,
            valueType.i.key,
            valueType.iB.key,
            valueType.d.key,
            valueType.dB.key,
        ]

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {items.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        dropdownData: state.dropdown.dropdownData
    }),
    {
        updateDeepPage,
        showDropdownByKey,
    }
)(PickUpdate)