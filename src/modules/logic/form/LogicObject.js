import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as proptool from '../proptool'

import { logicType } from '../types'
import LogicExpandable from './LogicExpandable';

class LogicObject extends React.Component{
    render() {
        const { logicInfo, updateRef } = this.props
        
        const show = logicInfo.logicType === logicType.update.key || logicInfo.logicType === logicType.transient.key
        if (!show) return null

        let filterBy
        switch (logicInfo.logicType) {
            case logicType.update.key:
                filterBy = 'updatable'
                break
            case logicType.transient.key:
                filterBy = 'transient'
                break
            default:
        }

        return (
            _.filter(Object.keys(updateRef), i => updateRef[i][filterBy])
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