import React from 'react'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { logicInfo, updates } = this.props
        const showForm = logicInfo.logicType === logicType.update.key
        if (!showForm) return null

        return (
            Object.keys(updates).map((property, index) => (
                <LogicExpandable
                    {...this.props}
                    key={index}
                    property={property}
                    updates={updates[property]}
                    prefix={property}
                />
            ))
        )
    }
}

export default LogicObject