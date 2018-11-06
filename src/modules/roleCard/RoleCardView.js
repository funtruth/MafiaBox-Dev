import React from 'react'
import { connect } from 'react-redux'

import { itemType } from '../roles/types'

import InputItem from './components/InputItem'
import BlurInputItem from './components/BlurInputItem'
import PropertyItem from './components/PropertyItem';

import { updateDefaultInfo } from './RoleCardReducer'

class RoleCardView extends React.Component{
    _renderItem = (item) => {
        let FieldComponent
        switch(item.type) {
            case itemType.input:
                FieldComponent = InputItem
                break
            case itemType.blurInput:
                FieldComponent = BlurInputItem
                break
            case itemType.tag:
                FieldComponent = PropertyItem
                break
            default:
                FieldComponent = null
                break
        }

        let defaultInfo = this.props.defaultInfo
        let value = defaultInfo[item.key]

        return (
            <FieldComponent
                name={item.key}
                label={item.title}
                placeholder={item.placeholder}
                data={item.data}
                value={value}
                updateRoleInfo={this.props.updateDefaultInfo}
            />
        )
    }

    render() {
        return (
            <div className="story-view">
                {this.props.fields.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        fields: state.roles.fields,
        defaultInfo: state.roleCard.defaultInfo,
    }),
    {
        updateDefaultInfo,
    }
)(RoleCardView)