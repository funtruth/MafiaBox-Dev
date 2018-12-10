import React from 'react'
import { connect } from 'react-redux'

import { addTag } from '../FieldReducer'
import { dropdownType } from '../../app/menu/types';

const ADD_NEW_TAG = 'add-new-tag'

class TemplateTag extends React.Component{
    _renderItem = (item, index) => {
        const { fieldInfo } = this.props
        const { fieldKey } = fieldInfo

        const style = {
            backgroundColor: item.color || 'rgba(40, 43, 48,1)',
            color: item.title ? '#fff' : '#969696',
        }

        return (
            <div
                key={item.key}
                className="property-button menu-onclick"
                menu-type={dropdownType.editTag}
                index-key={index}
                field-key={fieldKey}
                style={style}
                onClick={this._onClick.bind(this, item.key)}
            >
                {item.title || 'Untitled'}
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
        console.log(fieldInfo)
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
    null,
    {
        addTag,
    }
)(TemplateTag)