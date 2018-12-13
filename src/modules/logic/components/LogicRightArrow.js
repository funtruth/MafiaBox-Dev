import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'

import { addItemToRightOf } from '../../fields/FieldReducer'

class LogicRightArrow extends React.Component{
    _onClick = (enable) => {
        if (!enable) return

        const { item, field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemToRightOf(item, pageKey, field)
    }

    render() {
        const { item, value } = this.props
        const enableRight = (value[item].logicType !== logicType.return)

        return (
            <i
                className="ion-ios-fastforward logic-button-right"
                data-tip={enableRight ? "Add another operator." : null}
                onClick={this._onClick.bind(this, enableRight)}
                style={{ opacity: enableRight? 1 : 0.5 }}
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