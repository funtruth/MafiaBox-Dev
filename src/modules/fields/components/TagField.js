import React from 'react'
import { connect } from 'react-redux'
import { fieldIcon } from '../defaults'

class TagField extends React.Component{
    _renderItem = (tagKey) => {
        const { value, field, tagRepo } = this.props
        const active = field && tagKey === value
        const style = {
            backgroundColor: active ? (item.color || 'hsla(0,0%,100%,.1)') : 'rgba(40, 43, 48,1)',
        }
        
        const item = tagRepo[tagKey]

        return (
            <div key={tagKey} className="property-button" style={style} onClick={this._onClick.bind(this, tagKey)}>
                {item.title}
            </div>
        )
    }

    _onClick = key => {
        const { field, pageInfo } = this.props
        this.props.updatePage(pageInfo.pageKey, field, key)
    }

    render() {
        const { fieldInfo, field, data,
            tagRepo } = this.props
        if (!data) return null
        
        return (
            <div className="field-item" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.tag}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
                </div>
                <div className="row">
                    {fieldInfo.data.map(this._renderItem)}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        tagRepo: state.field.tagRepo,
    }),
    {
        
    }
)(TagField)