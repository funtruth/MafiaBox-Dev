import React from 'react'
import * as proptool from '../proptool'

import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { updateRef } = this.props
        
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