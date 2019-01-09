import React from 'react'
import { connect } from 'react-redux'

import { updateType, valueType } from '../types';
import { dropdownType } from '../../dropdown/types';

class UpdateButton extends React.Component{
    render() {
        const { config, field, pageInfo, logicInfo, item, prefix, vars, pageRepo } = this.props
        const info = logicInfo.data[prefix] || {}
        
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

        let attachments = "", attachVar = ""
        switch(config.dropdown) {
            case dropdownType.pickUid:
                attachments = vars
                attachVar = vars
                break
            case dropdownType.pickUpdate:
                attachments = info.dynamic
                break
            case dropdownType.addUpdateField:
                attachments = logicInfo.data
                attachVar = vars
                break
            default:
        }

        return (
            <div
                className="logic-pick-update menu-onclick"
                highlight="true"
                menu-type={config.dropdown}
                page-key={pageInfo.pageKey}
                index-key={item}
                field-key={field}
                subfield-key={prefix}
                current-value={info.value}
                attach={JSON.stringify(attachments)}
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