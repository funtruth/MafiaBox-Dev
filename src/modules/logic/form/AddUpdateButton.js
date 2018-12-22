import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { pushData } from '../../dropdown/DropdownReducer'

class AddUpdateButton extends React.Component{
    _onClick = (info) => {
        const { updates } = this.props
        const thisType = updates.dropdownType

        switch(thisType) {
            case dropdownType.pickUid:
                return this.props.pushData(this.props.vars)
            case dropdownType.pickUpdate:
                return this.props.pushData(info.dynamic)
            default:
        }
    }
    
    render() {
        const { field, pageInfo, logicInfo, item, prefix, updates } = this.props
        const info = logicInfo.data[prefix] || {}
        
        return (
            <div
                className="logic-pick-update menu-onclick highlight"
                menu-type={(updates && updates.dropdownType) || dropdownType.addUpdateField}
                page-key={pageInfo.pageKey}
                field-key={field}
                index-key={item}
                subfield-key={prefix}
                current-value={info.value}
                onClick={this._onClick.bind(this, info)}
            >
                <div style={{ pointerEvents: 'none', color: '#767676' }}>
                    Add</div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        pushData,
    }
)(AddUpdateButton)