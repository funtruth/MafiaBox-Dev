import React from 'react'
import * as proptool from '../proptool'

import { logicType } from '../types'

import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { updateRef, logicInfo } = this.props

        if (logicInfo.logicType !== logicType.update.key) return null
        
        return (
            proptool.getSubfields('', updateRef).map((item, index) => (
                <LogicExpandable
                    {...this.props}
                    key={index}
                    property={item.subfield}
                    prefix={item.subfield}
                />
            ))
        )
    }
}

export default LogicObject