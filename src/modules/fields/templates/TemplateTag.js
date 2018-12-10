import React from 'react'
import { connect } from 'react-redux'

import { addTag } from '../FieldReducer'
import { dropdownType } from '../../app/menu/types';

const ADD_NEW_TAG = 'add-new-tag'

class TemplateTag extends React.Component{
    _renderItem = (item, index) => {
        const { tagRepo } = this.props
        const fieldInfo = tagRepo[item.key]
        console.log(fieldInfo)

        const style = {
            backgroundColor: item.color || 'rgba(40, 43, 48,1)',
            color: fieldInfo && fieldInfo.title ? '#fff' : '#969696',
        }

        return (
            <div
                key={item.key}
                className="property-button menu-onclick"
                menu-type={dropdownType.editTag}
                index-key={index}
                tag-key={item.key}
                style={style}
                onClick={this._onClick.bind(this, item.key)}
            >
                {(fieldInfo && fieldInfo.title) || 'Untitled'}
            </div>
        )
    }

    _onClick = key => {
        if (key === ADD_NEW_TAG) {
            this.props.addTag(this.props.fieldInfo.fieldKey)
        }
    }

    render() {
        const { fieldInfo } = this.props
        const { data } = fieldInfo
        
        if (!data) return null
        
        return (
            <div className="row">
                {data.map(this._renderItem)}
                {this._renderItem({
                    key: ADD_NEW_TAG,
                    title: 'New Tag',
                    color: 'hsla(0,0%,100%,.1)',
                }, data.length)}
            </div>
        )
    }
}

export default connect(
    state => ({
        tagRepo: state.field.tagRepo,
    }),
    {
        addTag,
    }
)(TemplateTag)