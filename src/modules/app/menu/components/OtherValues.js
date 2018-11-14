import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../../page/PageReducer'

class OtherValues extends React.Component{
    _renderItem = (item) => {
        const { pageRepo, dropdownParams } = this.props
        const selected = item.key === pageRepo[dropdownParams.pageKey][dropdownParams.fieldKey]

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item.key)}
            >
                {item.title}
                {selected && <i
                    className="ion-md-checkmark"
                    style={{ marginLeft: 'auto' }}
                />}
            </div>
        )
    }

    _select = (newValue) => {
        const { dropdownParams, pageRepo } = this.props
        const { pageKey, fieldKey, indexKey, subfieldKey } = dropdownParams

        let valueClone = Array.from(pageRepo[pageKey][fieldKey])
        valueClone[indexKey][subfieldKey] = newValue
        
        this.props.updatePage(pageKey, fieldKey, valueClone)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownParams, fieldRepo } = this.props
        const { fieldKey, pageX, pageY } = dropdownParams

        if (!fieldKey) return null
        const fieldInfo = fieldRepo[fieldKey]

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {fieldInfo.data.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        fieldRepo: state.field.fieldRepo,
        pageRepo: state.page.pageRepo,
    }),
    {
        showDropdownByKey,
        updatePage,
    }
)(OtherValues)