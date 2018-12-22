import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class AddUpdateField extends React.Component{
    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', `${subfieldKey}.${item}`, 'value', '')
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, 'expand', true)
        this.props.showDropdownByKey()
    }

    render() {
        const { subfieldKey, updates } = this.props
        const items = proptool.getUpdateFields(subfieldKey, updates)

        return (
            items.map(item => {
                return (
                    <div
                        key={item}
                        className="drop-down-menu-option"
                        onClick={this._select.bind(this, item)}
                        style={{
                            color: '#b6b6b6'
                        }}
                    >
                        {item}
                    </div>
                )
            })
        )
    }
}

export default connect(
    state => ({
        updates: state.template.updates,
    }),
    {
        updatePageByPath,
        showDropdownByKey,
    }
)(AddUpdateField)