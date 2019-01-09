import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../proptool'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { logicInfo, updateRef } = this.props
        
        const show = logicInfo.logicType === logicType.update.key
        if (!show) return null

        return (
            _.filter(Object.keys(updateRef), i => i.indexOf('.') === -1)
                .map((property, index) => (
                    <LogicExpandable
                        {...this.props}
                        key={index}
                        property={property}
                        prefix={property}
                    />
                ))
        )
    }
}

export default connect(
    state => ({
        updateRef: proptool.addPlayerRef(state.template),
    })
)(LogicObject)