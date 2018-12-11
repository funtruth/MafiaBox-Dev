import React from 'react'
import { connect } from 'react-redux'

import { addTag } from '../FieldReducer'
import { dropdownType } from '../../dropdown/types';

const ADD_NEW_TAG = 'add-new-tag'

class TemplateTag extends React.Component{
    _renderItem = (item, index) => {
        const { tagRepo, fieldInfo } = this.props
        const tagInfo = tagRepo[item]

        const style = {
            backgroundColor: 'rgba(40, 43, 48,1)',
            color: tagInfo && tagInfo.title ? '#fff' : '#969696',
            marginBottom: 6,
        }

        return (
            <div
                key={item}
                className="property-button menu-onclick"
                menu-type={dropdownType.editTag}
                index-key={index}
                tag-key={item}
                field-key={fieldInfo.fieldKey}
                style={style}
            >
                {(tagInfo && tagInfo.title) || 'Untitled'}
            </div>
        )
    }

    _renderFooter() {
        const { fieldInfo } = this.props

        const style = {
            backgroundColor: 'hsla(0,0%,100%,.1)',
            color: '#969696',
            marginBottom: 6,
        }

        return (
            <div
                className="property-button menu-onclick"
                menu-type={dropdownType.createSomething}
                tag-key={ADD_NEW_TAG}
                field-key={fieldInfo.fieldKey}
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