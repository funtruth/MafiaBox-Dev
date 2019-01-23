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
        const { pageKey, fieldKey, value } = this.props
        const active = value && value[item.subfield]
        this.props.updatePageByPath(pageKey, fieldKey, item.subfield, !active)
    }

    render() {
        const { playerRef } = this.props
        const tags = _.filter(playerRef, i => i.tag)
        
        return (
            <div className="row -x-m">
                {tags.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        playerRef: state.template.playerRef,
    })
)(PlayerTagField)