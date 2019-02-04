import React from 'react'
import _ from 'lodash'

class TagField extends React.Component{
    _renderItem = (item) => {
        const { value, fieldKey } = this.props  
        const active = fieldKey && item.key === value

        return (
            <div
                key={item.key}
                className="field-tag"
                style={{
                    backgroundColor: active && (item.color || '#6279CA'),
                }}
                onClick={this._onClick.bind(this, item.key)}
            >
                {item.title || 'Untitled'}
            </div>
        )
    }

    _onClick = key => {
        const { fieldKey } = this.props
        this.props.updatePage(fieldKey, key)
    }

    render() {
        const { data } = this.props
        if (!data) return null

        const tags = _.sortBy(data, i => i.index)
        
        return (
            <div className="row -x-p">
                {tags.map(this._renderItem)}
            </div>
        )
    }
}

export default TagField