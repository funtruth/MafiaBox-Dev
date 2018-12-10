import React from 'react'
import { connect } from 'react-redux'

import { addTag } from '../FieldReducer'
import { dropdownType } from '../../app/menu/types';

const ADD_NEW_TAG = 'add-new-tag'

class TemplateTag extends React.Component{
    _renderItem = (item, index) => {
        const { tagRepo } = this.props
        const fieldInfo = tagRepo[item.key]

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
            >
                {(fieldInfo && fieldInfo.title) || (item.key === ADD_NEW_TAG && item.title) || 'Untitled'}
            </div>
        )
    }

    _renderFooter() {
        const style = {
            backgroundColor: 'hsla(0,0%,100%,.1)',
            color: '#969696',
        }

        return (
            <div
                className="property-button menu-onclick"
                menu-type={dropdownType.createSomething}
                tag-key={ADD_NEW_TAG}
                style={style}
            >
                Add Tag
            </div>
        )
    }

    render() {
        const { fieldInfo } = this.props
        const data = fieldInfo.data || []
        
        return (
            <div className="row">
                {data.map(this._renderItem)}
                {this._renderFooter()}
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