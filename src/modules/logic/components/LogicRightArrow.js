import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'

import { addItemToRightOf } from '../../fields/FieldReducer'

class LogicRightArrow extends React.Component{
    _onClick = () => {
        const { item, field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemToRightOf(item, pageKey, field)
    }

    render() {
        const { logicInfo } = this.props

        const hide = logicInfo.logicType === logicType.return.key ||
            logicInfo.logicType === logicType.update.key
        if (hide) return null

        return (
            <i
                className="ion-ios-fastforward logic-button-right"
                data-tip="Add another operator"
                onClick={this._onClick}
            />
        )
    }
}

export default connect(
    null,
    {
        addItemToRightOf,
    }
)(LogicRightArrow)