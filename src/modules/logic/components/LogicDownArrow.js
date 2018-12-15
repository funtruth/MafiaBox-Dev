import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'

import { addItemBelowOf } from '../../fields/FieldReducer'

class LogicDownArrow extends React.Component{
    _onClick = (hide) => {
        if (hide) return
        const { item, field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemBelowOf(item, pageKey, field)
    }

    render() {
        const { logicInfo } = this.props

        const hide = logicInfo.logicType === logicType.return ||
            logicInfo.logicType === logicType.update

        return (
            <i 
                className="ion-md-arrow-dropdown logic-button-down"
                data-tip={hide ? null : "Add another operator"}
                onClick={this._onClick.bind(this, hide)}
                style={{ opacity: hide ? 0.4 : 1 }}
            />
        )
    }
}

export default connect(
    null,
    {
        addItemBelowOf,
    }
)(LogicDownArrow)