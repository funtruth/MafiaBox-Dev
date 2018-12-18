import React from 'react'
import { connect } from 'react-redux'

import { valueType, updateType } from '../types';

import { pushData } from '../../dropdown/DropdownReducer'

class LogicPickUpdate extends React.Component{
    _onClick = (info) => {
        switch(info.updateType) {
            case updateType.uid:
                return this.props.pushData(this.props.vars)
            case updateType.dynamicVal:
                return this.props.pushData(info.dynamic)
            default:
        }
    }

    _renderItem = (item) => {
        const { pageRepo } = this.props
        switch(item.updateType) {
            case updateType.phase:
                return <div style={{ pointerEvents: 'none' }}>{pageRepo[item.value].title}</div>
            case updateType.uid:
                return <div style={{ pointerEvents: 'none' }}>{item.value}</div>
            case updateType.staticVal:
                return <div style={{ pointerEvents: 'none' }}>{valueType[item.value].title}</div>
            case updateType.dynamicVal:
                return (
                    <div style={{ pointerEvents: 'none' }}>
                        {valueType[item.value].title + ' ' + item.dynamic}
                    </div>
                )
            default:
                return <div style={{ pointerEvents: 'none', color: '#767676' }}>Select</div>
        }
    }

    render() {
        const { room, field, pageInfo, logicInfo, item, prefix } = this.props
        const { dropdownType } = room
        const info = logicInfo.data[prefix] || {}
        
        return (
            <div
                className="logic-pick-update menu-onclick highlight"
                menu-type={dropdownType}
                page-key={pageInfo.pageKey}
                index-key={item}
                field-key={field}
                subfield-key={prefix}
                current-value={info.value}
                onClick={this._onClick.bind(this, info)}
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
    {
        pushData,
    }
)(LogicPickUpdate)