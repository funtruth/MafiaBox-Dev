import React from 'react'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { value, item, room } = this.props
        const showForm = value[item].logicType === logicType.update
        if (!showForm) return null

        return (
            Object.keys(room).map((property, index) => (
                <LogicExpandable
                    {...this.props}
                    key={index}
                    property={property}
                    room={room[property]}
                    prefix={property}
                />
            ))
        )
    }
}

export default LogicObject