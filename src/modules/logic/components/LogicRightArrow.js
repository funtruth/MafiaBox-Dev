import React from 'react'
import { connect } from 'react-redux'

import { addItem } from '../../fields/FieldReducer'

class LogicRightArrow extends React.Component{
    _onClick = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        this.props.addItem(pageKey, fieldKey, indexKey, 'right')
    }

    render() {
        return (
            <div
                className="logic-button-right"
                data-tip="Add another operator"
                onClick={this._onClick}
            >
                <i className="ion-ios-fastforward"/>
            </div>
        )
    }
}

export default connect(
    null,
    {
        addItem,
    }
)(LogicRightArrow)