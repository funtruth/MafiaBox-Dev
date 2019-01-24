import React from 'react'
import { connect } from 'react-redux'

import { addItem } from '../../fields/FieldReducer'

class LogicDownArrow extends React.Component{
    _onClick = () => {
        const { pageKey, fieldKey, indexKey } = this.props
        this.props.addItem(pageKey, fieldKey, indexKey, 'down')
    }

    render() {
        return (
            <i 
                className="ion-md-arrow-dropdown logic-button-down"
                data-tip="Add another operator"
                onClick={this._onClick}
            />
        )
    }
}

export default connect(
    null,
    {
        addItem,
    }
)(LogicDownArrow)