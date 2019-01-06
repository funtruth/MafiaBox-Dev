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
            default:
                buttonText = <div style={{ color: '#767676' }}>{config.action}</div>
        }

        let attachments = ""
        switch(config.dropdown) {
            case dropdownType.pickUid:
                attachments = vars
                break
            case dropdownType.pickUpdate:
                attachments = info.dynamic
                break
            default:
        }

        return (
            <div
                className="logic-pick-update menu-onclick highlight"
                menu-type={config.dropdown}
                page-key={pageInfo.pageKey}
                index-key={item}
                field-key={field}
                subfield-key={prefix}
                current-value={info.value}
                attach={JSON.stringify(attachments)}
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