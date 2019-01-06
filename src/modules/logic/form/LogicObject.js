import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { logicInfo, updateRefs } = this.props
        console.log(logicInfo)
        const showForm = logicInfo.logicType === logicType.update.key
        if (!showForm) return null

        //render an expandable for each basic property (without any .'s)
        return (
            _.filter(Object.keys(updateRefs), i => i.indexOf('.') === -1)
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
        updateRefs: state.template.updateRefs,
    })
)(LogicObject)