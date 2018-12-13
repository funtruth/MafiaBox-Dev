import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'

import { addItemBelowOf } from '../../fields/FieldReducer'

class LogicDownArrow extends React.Component{
    _onClick = (enableDown) => {
        if (!enableDown) return

        const { item, field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemBelowOf(item, pageKey, field)
    }

    render() {
        const { item, value } = this.props
        const enableDown = (value[item].logicType !== logicType.function
            && value[item].logicType !== logicType.return)

        return (
            <i 
                className="ion-md-arrow-dropdown logic-button-down"
                data-tip={enableDown ? "Add another operator." : null}
                onClick={this._onClick.bind(this, enableDown)}
                style={{ opacity: enableDown? 1 : 0.5 }}
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