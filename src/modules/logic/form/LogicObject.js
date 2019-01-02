import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { logicInfo, updates, updateRefs } = this.props

        const showForm = logicInfo.logicType === logicType.update.key
        if (!showForm) return null

        return (
            _.filter(Object.keys(updateRefs), i => i.indexOf('.') === -1)
                .map((property, index) => (
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

export default connect(
    state => ({
        updates: state.template.updates,
        updateRefs: state.template.updateRefs,
    })
)(LogicObject)