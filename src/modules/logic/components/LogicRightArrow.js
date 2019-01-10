import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'

import { addItemToRightOf } from '../../fields/FieldReducer'

class LogicRightArrow extends React.Component{
    _onClick = () => {
        const { item, fieldKey, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemToRightOf(item, pageKey, fieldKey)
    }

    render() {
        const { logicInfo } = this.props

        const hide = logicInfo.logicType === logicType.return.key
        if (hide) return null

        return (
            <div
                className="logic-button-right"
                data-tip="Add another operator"
                onClick={this._onClick}
            >
                <i
                    className="ion-ios-fastforward"
                />
            </div>
        )
    }
}

export default connect(
    null,
    {
        addItemToRightOf,
    }
)(LogicRightArrow)