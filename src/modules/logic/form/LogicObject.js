import React from 'react'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { value, item, room } = this.props
        const showForm = value[item].logicType === logicType.update
        if (!showForm) return null

        return (
            Object.keys(room).map((item, index) => (
                <LogicExpandable {...this.props} key={index} item={item} room={room[item]}/>
            ))
        )
    }
}

export default LogicObject