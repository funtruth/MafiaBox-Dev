import React from 'react'
import { connect } from 'react-redux'

import { dataPropToTitle } from '../LogicReducer'

class LogicPanel extends React.Component{
    render() {
        const { pageKey, fieldKey, indexKey, subfieldKey,
            logicInfo, vars, placeholder, dropdown } = this.props
        const { data } = logicInfo
        const dataProp = data[subfieldKey] || {}

        return (
            <div
                className="logic-button app-onclick"
                menu-type={dropdown}
                app-onclick-props={JSON.stringify({
                    pageKey,
                    fieldKey,
                    indexKey,
                    subfieldKey,
                    currentValue: dataProp,
                    attach: data,
                    attachVar: vars,
                })}
                style={{
                    color: (dataProp.key || dataProp.value || dataProp.adjust) ? '#fff' : '#868686',
                    borderRadius: '0px 4px 0px 0px',
                }}
            >
                <div className="text-ellipsis">
                    {dataProp.code || this.props.dataPropToTitle(dataProp) || placeholder || 'select ...'}
                </div> 
            </div>
        )
    }
}

export default connect(
    null,
    {
        dataPropToTitle,
    }
)(LogicPanel)