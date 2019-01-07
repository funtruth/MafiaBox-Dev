import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../proptool'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { logicInfo, updateRef } = this.props
        
        const showForm = logicInfo.logicType === logicType.update.key
        if (!showForm) return null

        //render an expandable for each basic property (without any .'s)
        return (
            _.filter(Object.keys(updateRef), i => updateRef[i].updatable)
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