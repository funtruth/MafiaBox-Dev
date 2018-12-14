import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'

class LogicObject extends React.Component{
    _renderItem = (room, item, index) => {
        const childrenData = typeof room[item] === 'object' ?
            Object.keys(room[item]) : []
        
        return (
            <div
                key={index}
                className="logic-form-label"
            >
                {item}
                {childrenData.map(this._renderItem.bind(this, room[item]))}
            </div>
        )
    }

    render() {
        const { value, item, room } = this.props
        const showForm = value[item].logicType === logicType.update
        if (!showForm) return null

        const dbKeys = Object.keys(room)

        return (
            dbKeys.map(this._renderItem.bind(this, room))
        )
    }
}

export default connect(
    state => ({
        room: state.template.room,
    })
)(LogicObject)