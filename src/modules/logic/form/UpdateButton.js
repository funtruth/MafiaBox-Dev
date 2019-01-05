import React from 'react'
import { connect } from 'react-redux'

import { updateType, valueType } from '../types';
import { dropdownType } from '../../dropdown/types'

class UpdateButton extends React.Component{
    _renderItem = (item) => {
        const { pageRepo, config } = this.props
        switch(item.valueType) {
            case valueType.page:
                return <div style={{ pointerEvents: 'none' }}>{pageRepo[item.value].title}</div>
            case valueType.uid:
                return <div style={{ pointerEvents: 'none' }}>{item.value || 'null'}</div>
            case valueType.staticVal:
                return <div style={{ pointerEvents: 'none' }}>{updateType[item.value].title}</div>
            case valueType.dynamicVal:
                return <div style={{ pointerEvents: 'none' }}>{updateType[item.value].title + ' ' + item.dynamic}</div>
            default:
                return <div style={{ pointerEvents: 'none', color: '#767676' }}>{config.action}</div>
        }
    }

    render() {
        const { config, field, pageInfo, logicInfo, item, prefix, vars } = this.props
        const info = logicInfo.data[prefix] || {}

        console.log({config, info})
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
                {this._renderItem(info)}
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
)(UpdateButton)