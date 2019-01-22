import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class PlayerTagField extends React.Component{
    _renderItem = (item) => {
        const { value, fieldKey } = this.props
        
        //todo i think this is wrong
        const active = fieldKey && value && value[item.key]
        
        return (
            <div
                key={item.key}
                className="field-tag"
                style={{
                    backgroundColor: active ?
                        (item.color || '#6279CA') : 'rgba(40, 43, 48,1)',
                }}
                onClick={this._onClick.bind(this, item.key)}
            >
                {item.subfield}
            </div>
        )
    }

    _onClick = tagKey => {
        const { fieldKey, value, pageInfo } = this.props
        const { pageKey } = pageInfo

        let dataClone = Object.assign({}, value)
        dataClone[tagKey] = !dataClone[tagKey]

        this.props.updatePageByPath(pageKey, fieldKey, dataClone)
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