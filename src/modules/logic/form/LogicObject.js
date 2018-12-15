import React from 'react'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { logicInfo, room } = this.props
        const showForm = logicInfo.logicType === logicType.update
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