import React from 'react'
import { connect } from 'react-redux';

import { fieldType } from './defaults'

import { updatePage } from '../page/PageReducer'

import InputField from '../page/components/InputField'
import TagPickField from '../page/components/TagPickField';

class FieldView extends React.Component {
    _renderItem = (item) => {
        const { pageInfo, fieldRepo, updatePage } = this.props
        const fieldInfo = fieldRepo[item]
        const { fieldKey, data } = fieldInfo

        const props = {
            key: fieldKey,
            field: fieldKey,
            value: pageInfo[fieldKey],
            data,
            pageInfo,
            fieldInfo,
            updatePage,
        }
        
        switch(fieldInfo.fieldType) {
            case fieldType.text:
                return <InputField {...props}/>
            case fieldType.tag:
                return <TagPickField {...props}/>
            default:
                return null
        }

    }

    render() {
        const { pageInfo } = this.props
        const { boardType } = pageInfo
        if (!boardType) return null
        
        const fields = this.props.fieldMap[boardType]

        return (
            <div>
                {fields.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        fieldMap: state.field.fieldMap,
        fieldRepo: state.field.fieldRepo,
    }),
    {
        updatePage,
    }
)(FieldView)