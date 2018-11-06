import React from 'react'
import './roles.css'
import { connect } from 'react-redux'

import { itemType } from './types'

import InputItem from './components/InputItem'
import BlurInputItem from './components/BlurInputItem'
import PropertyItem from './components/PropertyItem';

import { updateRoleInfo } from './RoleReducer'

class RoleView extends React.Component{
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

        let roleId = this.props.match.params.roleId
        if (!roleId) return null
        let roleInfo = this.props.roles[roleId]
        if (!roleInfo) return null
        let value = roleInfo[item.key]

        return (
            <FieldComponent
                name={item.key}
                label={item.title}
                placeholder={item.placeholder}
                data={item.data}
                roleId={roleId}
                value={value}
                updateRoleInfo={this.props.updateRoleInfo}
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
        roles: state.roles.roles,
    }),
    {
        updateRoleInfo,
    }
)(RoleView)