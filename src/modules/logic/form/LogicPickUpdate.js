import React from 'react'
import { connect } from 'react-redux'

import { valueType, updateType } from '../types';
import { dropdownType } from '../../dropdown/types'

class LogicPickUpdate extends React.Component{
    _renderItem = (item) => {
        const { pageRepo } = this.props
        switch(item.updateType) {
            case updateType.phase:
                return <div style={{ pointerEvents: 'none' }}>{pageRepo[item.value].title}</div>
            case updateType.uid:
                return <div style={{ pointerEvents: 'none' }}>{item.value || 'null'}</div>
            case updateType.staticVal:
                return <div style={{ pointerEvents: 'none' }}>{valueType[item.value].title}</div>
            case updateType.dynamicVal:
                return <div style={{ pointerEvents: 'none' }}>{valueType[item.value].title + ' ' + item.dynamic}</div>
            default:
                return <div style={{ pointerEvents: 'none', color: '#767676' }}>Select</div>
        }
    }

    render() {
        const { updates, field, pageInfo, logicInfo, item, prefix, vars } = this.props
        const info = logicInfo.data[prefix] || {}

        console.log('logicPickUpdate', this.props)
        let attachments = ""
        switch(updates.dropdownType) {
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
                menu-type={updates}
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
)(LogicPickUpdate)