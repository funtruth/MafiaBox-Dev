import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { showDropdown } from '../DropdownReducer'
import { updateField } from '../../fields/FieldReducer'

import { fieldType } from '../../fields/defaults'

class PickFieldType extends React.Component{
    _renderItem = (item) => {
        const { fieldRepo, fieldKey } = this.props
        const selected = fieldRepo[fieldKey].fieldType === item.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item.key)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6',
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {selected && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _select = (newValue) => {
        this.props.updateField(this.props.fieldKey, 'fieldType', newValue)
        this.props.showDropdown()
    }

    render() {
        const data = _.orderBy(fieldType, i => i.index)
        return (
            data.map(this._renderItem)
        )
    }
}

export default connect(
    state => ({
        fieldRepo: state.field.fieldRepo,
    }),
    {
        showDropdown,
        updateField,
    }
)(PickFieldType)