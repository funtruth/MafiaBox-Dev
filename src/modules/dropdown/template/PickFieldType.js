import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updateField } from '../../fields/FieldReducer'

import { fieldType, fieldTypeToIcon, fieldTypeToTitle } from '../../fields/defaults'

class PickFieldType extends React.Component{
    _renderItem = (item) => {
        const { fieldRepo, dropdownParams } = this.props
        const { fieldKey } = dropdownParams
        
        const selected = fieldRepo[fieldKey].fieldType === item

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
                    className={`${fieldTypeToIcon[item]} drop-down-menu-icon`}
                />
                {fieldTypeToTitle[item]}
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
        this.props.updateField(this.props.dropdownParams.fieldKey, 'fieldType', newValue)
        this.props.showDropdownByKey()
    }

    render() {
        const { dropdownParams } = this.props
        const { pageX, pageY } = dropdownParams

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        let menu = [
            fieldType.text,
            fieldType.number,
            fieldType.logic,
            fieldType.tag,
            fieldType.property,
        ]

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {menu.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        fieldRepo: state.field.fieldRepo,
        dropdownParams: state.dropdown.dropdownParams,
    }),
    {
        showDropdownByKey,
        updateField,
    }
)(PickFieldType)