import React from 'react'
import _ from 'lodash'

class TagField extends React.Component{
    _renderItem = (item) => {
        const { value, fieldKey } = this.props
        
        const active = fieldKey && item.key === value

        return (
            <div
                key={item.key}
                className="property-button"
                style={{
                    backgroundColor: active ?
                        (item.color || 'hsla(0,0%,100%,.1)') : 'rgba(40, 43, 48,1)',
                }}
                onClick={this._onClick.bind(this, item.key)}
            >
                {item.title || 'Untitled'}
            </div>
        )
    }

    _onClick = key => {
        const { fieldKey, pageInfo } = this.props
        this.props.updatePageByPath(pageInfo.pageKey, fieldKey, key)
    }

    render() {
        const { data } = this.props
        if (!data) return null

        const tags = _.sortBy(data, i => i.index)
        
        return (
            <div className="row">
                {tags.map(this._renderItem)}
            </div>
        )
    }
}

export default TagField