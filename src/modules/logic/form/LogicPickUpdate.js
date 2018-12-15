import React from 'react'
import { connect } from 'react-redux'

import { valueType } from '../types';

import { pushData } from '../../dropdown/DropdownReducer'

class LogicPickUpdate extends React.Component{
    _onClick = () => {
        const { logicInfo, prefix } = this.props
        const value = (logicInfo.data[prefix] && logicInfo.data[prefix].value) || valueType.nC.key
        this.props.pushData(value)
    }

    render() {
        const { room, field, pageInfo, logicInfo, item, prefix } = this.props
        const { dropdownType } = room
        const value = (logicInfo.data[prefix] && logicInfo.data[prefix].value) || valueType.nC.key
        
        return (
            <div
                className="logic-pick-update menu-onclick"
                menu-type={dropdownType}
                page-key={pageInfo.pageKey}
                index-key={item}
                field-key={field}
                subfield-key={prefix}
                style={{
                    marginLeft: 'auto',
                }}
                onClick={this._onClick}
            >
                {valueType[value].label}
            </div>
        )
    }
}

export default connect(
    null,
    {
        pushData,
    }
)(LogicPickUpdate)