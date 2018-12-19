import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'
import { dropdownType } from '../../dropdown/types'
import { comparisonType } from '../types'

import { addItemBelowOf } from '../../fields/FieldReducer'
import { pushData } from '../../dropdown/DropdownReducer'

class LogicPanels extends React.Component{
    _onClick = () => {
        const { vars } = this.props
        this.props.pushData(vars)
    }
    
    render() {
        const { item, field, logicInfo, pageInfo, pageRepo } = this.props
        const isOperator = logicInfo.logicType === logicType.operator
        
        if (isOperator) return (
            <div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.pickVar}
                    field-key={field}
                    subfield-key="var1"
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    current-value={logicInfo.data.var1}
                    style={{
                        color: logicInfo.data.var1 ? '#fff' : '#868686',
                        borderRadius: '0px 4px 0px 0px',
                    }}
                    onClick={this._onClick}
                >
                    <div className="text-ellipsis">
                        {logicInfo.data.var1 || 'Variable'}
                    </div> 
                </div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.pickComparison}
                    field-key={field}
                    subfield-key="comparison"
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    current-value={logicInfo.data.comparison}
                    style={{
                        color: logicInfo.data.comparison ? '#d6d6d6' : '#868686',
                    }}
                >
                    <div className="text-ellipsis">
                        {(logicInfo.data.comparison && comparisonType[logicInfo.data.comparison].title) || 'Operator'}
                    </div>
                </div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.pickVar}
                    field-key={field}
                    subfield-key="var2"
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    current-value={logicInfo.data.var2}
                    style={{
                        color: logicInfo.data.var2 ? '#fff' : '#868686',
                        borderRadius: '0px 0px 4px 0px',
                    }}
                    onClick={this._onClick}
                >
                    <div className="text-ellipsis">
                        {logicInfo.data.var2 || 'Variable'}
                    </div>
                </div>
            </div>
        )

        const hasPage = pageRepo[logicInfo.data]
        return (
            <div
                className="logic-button menu-onclick"
                menu-type={dropdownType.showLibrary}
                field-key={field}
                index-key={item}
                page-key={pageInfo.pageKey}
                current-value={logicInfo.data}
                style={{
                    color: hasPage ? '#fff' : '#868686',
                    borderRadius: '0px 4px 4px 0px',
                }}
            >
                <div className="text-ellipsis">
                    {hasPage ? 
                        pageRepo[logicInfo.data].title
                        :'Empty'
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        addItemBelowOf,
        pushData,
    }
)(LogicPanels)