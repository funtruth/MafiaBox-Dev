import React from 'react'
import { connect } from 'react-redux'

import { updateType, valueType } from '../types';

class UpdateButton extends React.Component{
    render() {
        const { pageKey, fieldKey, indexKey, subfieldKey, config,
            logicInfo, prefix, vars, pageRepo } = this.props
        const info = (logicInfo.data && logicInfo.data[prefix]) || {}
        
        let buttonText = ""
        switch(info.valueType) {
            case valueType.page:
                buttonText = pageRepo[info.value].title
                break
            case valueType.uid:
                buttonText = info.value
                break
            case valueType.staticVal:
                buttonText = updateType[info.value].title
                break
            case valueType.dynamicVal:
                buttonText = `${updateType[info.value].title} ${info.dynamic}`
                break
            case valueType.health:
                buttonText = updateType[info.value].label.map((item, index) => <i className={item} key={index}/>)
                break
            default:
                buttonText = <div style={{ color: '#767676' }}>{config.action}</div>
        }

        let attach = "", attachVar = "", currentValue = ""
        if (subfieldKey) {
            attach = (logicInfo.data && logicInfo.data[subfieldKey] && logicInfo.data[subfieldKey].value) || {}
            attachVar = vars
            currentValue = subfieldKey
        } else {
            attach = logicInfo.data
            attachVar = vars
            currentValue = info.value
        }
        
        return (
            <div
                className="logic-pick-update app-onclick"
                highlight="true"
                menu-type={config.dropdown}
                page-key={pageKey}
                index-key={indexKey}
                field-key={fieldKey}
                subfield-key={prefix}
                current-value={currentValue}
                attach={JSON.stringify(attach)}
                attach-var={JSON.stringify(attachVar)}
            >
                <div style={{ pointerEvents: 'none' }}>
                    {buttonText}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(UpdateButton)