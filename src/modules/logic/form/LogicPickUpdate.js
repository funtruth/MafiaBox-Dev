import React from 'react'
import { connect } from 'react-redux'

import { valueType } from '../types';

import { pushData } from '../../dropdown/DropdownReducer'

class LogicPickUpdate extends React.Component{
    _onClick = () => {
        const { vars } = this.props
        this.props.pushData(vars)
    }

    render() {
        const { room, field, pageInfo, logicInfo, item, prefix, vars, pageRepo } = this.props
        const { dropdownType } = room
        const value = (logicInfo.data[prefix] && logicInfo.data[prefix].value) || valueType.nC.key

        const ids = value.split('-')
        const isPage = ids[0] === 'phase'
        const isVariable = vars[value]
        const isLogicValue = !isPage && !isVariable
        
        return (
            <div
                className="logic-pick-update menu-onclick"
                menu-type={dropdownType}
                page-key={pageInfo.pageKey}
                index-key={item}
                field-key={field}
                subfield-key={prefix}
                current-value={value}
                style={{
                    marginLeft: 'auto',
                    width: 18,
                    fontSize: 13,
                    textAlign: 'center',
                }}
                onClick={this._onClick}
            >
                {isPage && <div style={{ pointerEvents: 'none' }}>
                    {pageRepo[value].title}</div>}
                {isLogicValue && <i className={`${valueType[value].icon} drop-down-menu-icon`}/>}
                {isVariable && <div style={{ pointerEvents: 'none' }}>
                    {value}</div>}
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