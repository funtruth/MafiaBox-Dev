import React from 'react'
import { connect } from 'react-redux'

import { comparisonType } from '../../logic/types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'

class PickComparison extends React.Component{
    _renderItem = (item) => {
        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, subfieldKey, indexKey } = dropdownParams

        const selected = pageRepo[pageKey] 
            && pageRepo[pageKey][fieldKey] 
            && pageRepo[pageKey][fieldKey][indexKey]
            && pageRepo[pageKey][fieldKey][indexKey][subfieldKey] === item

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
                {comparisonType[item].title}
                {selected ? <i
                    className="ion-md-checkmark"
                    style={{ marginLeft: 'auto', width: 30, textAlign: 'center' }}
                />:<div style={{ width: 30, marginLeft: 'auto' }}/>}
            </div>
        )
    }

    _select = (newValue) => {
        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, subfieldKey, indexKey } = dropdownParams
        
        let valueClone = {}
        Object.assign(valueClone, pageRepo[pageKey][fieldKey])

        valueClone[indexKey][subfieldKey] = newValue
        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX + 10,
            minWidth: 80,
        }

        return (
            <div className="drop-down-menu-autow" style={menuStyle}>
                {Object.keys(comparisonType).map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        dropdownParams: state.dropdown.dropdownParams,
    }),
    {
        updatePage,
        showDropdownByKey,
    }
)(PickComparison)