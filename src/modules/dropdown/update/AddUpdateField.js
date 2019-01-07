import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { showDropdown } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class AddUpdateField extends React.Component{
    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', `${subfieldKey}.${item}`, 'value', '')
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, 'expand', true)
        this.props.showDropdown()
    }

    render() {
        const { subfieldKey, updateRefs } = this.props
        const items = proptool.getSubfields(subfieldKey, updateRefs)

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
        updateRefs: state.template.updateRefs,
    }),
    {
        updatePageByPath,
        showDropdown,
    }
)(AddUpdateField)