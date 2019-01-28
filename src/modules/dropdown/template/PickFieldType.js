import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateField } from '../../fields/FieldReducer'

import { fieldType } from '../../fields/defaults'

class PickFieldType extends React.Component{
    _renderItem = (item) => {
        const { fieldRepo, fieldKey } = this.props
        const chosen = fieldRepo[fieldKey].fieldType === item.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item.key)}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    _select = (newValue) => {
        const { fieldKey } = this.props
        this.props.updateField(fieldKey, 'fieldType', newValue)
        this.props.showDropdown()
    }

    render() {
        const data = _(fieldType)
            .orderBy(i => i.index)
            .filter(i => !i.readOnly)
            .value()
        
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
        updateField,
    }
)(PickFieldType)