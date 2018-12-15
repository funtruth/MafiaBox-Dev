import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'

class PickVar extends React.Component{
    _renderItem = (item) => {
        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, subfieldKey, indexKey } = dropdownParams

        const selected = pageRepo[pageKey] 
            && pageRepo[pageKey][fieldKey] 
            && pageRepo[pageKey][fieldKey][indexKey]
            && pageRepo[pageKey][fieldKey][indexKey].data
            && pageRepo[pageKey][fieldKey][indexKey].data[subfieldKey] === item
        
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
                {item}
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
        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, subfieldKey, indexKey } = dropdownParams
        
        let valueClone = {}
        Object.assign(valueClone, pageRepo[pageKey][fieldKey])

        valueClone[indexKey].data[subfieldKey] = newValue
        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownParams, dropdownData } = this.props
        const { pageX, pageY } = dropdownParams
        
        let menuStyle = {
            top: pageY,
            left: pageX,
            maxHeight: 200,
            overflow: 'auto',
        }

        if (!dropdownData) return null

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {dropdownData.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        dropdownParams: state.dropdown.dropdownParams,
        dropdownData: state.dropdown.dropdownData,
    }),
    {
        updatePage,
        showDropdownByKey,
    }
)(PickVar)