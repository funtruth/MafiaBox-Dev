import React from 'react'
import { connect } from 'react-redux'

import { boardType } from '../board/types'
import { fieldType } from '../fields/defaults'

import InputItem from './components/InputItem'

class RoleCardView extends React.Component{
    _renderItem = (fieldKey) => {
        const { fieldRepo } = this.props
        const item = fieldRepo[fieldKey]
        if (!item) return null

        let FieldComponent
        switch(item.fieldType) {
            case fieldType.text:
                FieldComponent = InputItem
                break
            default:
        }

        if (!FieldComponent) return null
        return (
            <FieldComponent
                {...item}
                key={item.fieldKey}
            />
        )
        
    }

    render() {
        const info = this.props.fieldMap[boardType.roles]
        if (!info) return null

        return (
            <div className="story-view">
                {info.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        fieldMap: state.field.fieldMap,
        fieldRepo: state.field.fieldRepo,
    }),
)(RoleCardView)