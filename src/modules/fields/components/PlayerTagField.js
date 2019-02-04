import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class PlayerTagField extends React.Component{
    _renderItem = (item) => {
        const { value } = this.props
        const active = value && value[item.subfield]
        
        return (
            <div
                key={item.key}
                className="field-tag"
                style={{
                    backgroundColor: active && (item.color || '#6279CA'),
                }}
                onClick={this._onClick.bind(this, item)}
            >
                {item.subfield}
            </div>
        )
    }

    _onClick = (item) => {
        const { fieldKey, value } = this.props
        const active = value && value[item.subfield]
        this.props.updatePage(fieldKey, {
            [item.subfield]: !active,
        })
    }

    render() {
        const { updateRef } = this.props
        const tags = _(updateRef)
            .filter(i => i.tag)
            .value()
        
        return (
            <div className="row -x-p">
                {tags.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    })
)(PlayerTagField)