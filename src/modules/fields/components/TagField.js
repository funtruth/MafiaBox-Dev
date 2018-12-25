import React from 'react'
import { connect } from 'react-redux'

class TagField extends React.Component{
    _renderItem = (tagKey) => {
        const { value, field, tagRepo } = this.props
        const item = tagRepo[tagKey]
        
        const active = field && tagKey === value
        const style = {
            backgroundColor: active ? (item.color || 'hsla(0,0%,100%,.1)') : 'rgba(40, 43, 48,1)',
        }
        

        return (
            <div key={tagKey} className="property-button" style={style} onClick={this._onClick.bind(this, tagKey)}>
                {(item && item.title) || 'Untitled'}
            </div>
        )
    }

    _onClick = key => {
        const { fieldKey, pageInfo } = this.props
        this.props.updatePage(pageInfo.pageKey, fieldKey, key)
    }

    render() {
        const { fieldInfo, data } = this.props
        if (!data) return null
        
        return (
            <div className="row">
                {fieldInfo.data.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        tagRepo: state.field.tagRepo,
    }),
)(TagField)