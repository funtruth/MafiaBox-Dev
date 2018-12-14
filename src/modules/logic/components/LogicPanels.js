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
        const varKeys = Object.keys(vars)
        this.props.pushData(varKeys)
    }
    
    render() {
        const { item, field, value, pageInfo, pageRepo } = this.props
        const isOperator = value[item].logicType === logicType.operator
        
        if (isOperator) return (
            <div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.pickVar}
                    field-key={field}
                    subfield-key="var1"
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    style={{
                        color: value[item].var1 ? '#fff' : '#868686',
                        borderRadius: '0px 4px 0px 0px',
                    }}
                    onClick={this._onClick}
                >
                    {value[item].var1 || 'Empty'}
                </div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.pickComparison}
                    field-key={field}
                    subfield-key="comparison"
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    style={{
                        color: value[item].comparison ? '#d6d6d6' : '#868686',
                    }}
                >
                    {(value[item].comparison && comparisonType[value[item].comparison].title) || ''}
                </div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.pickVar}
                    field-key={field}
                    subfield-key="var2"
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    style={{
                        color: value[item].var2 ? '#fff' : '#868686',
                        borderRadius: '0px 0px 4px 0px',
                    }}
                    onClick={this._onClick}
                >
                    {value[item].var2 || 'Empty'}
                </div>
            </div>
        )

        const hasPage = pageRepo[value[item].pageKey]
        return (
            <div
                className="logic-button menu-onclick"
                menu-type={dropdownType.showLibrary}
                field-key={field}
                index-key={item}
                page-key={pageInfo.pageKey}
                style={{
                    color: hasPage ? '#fff' : '#868686',
                    borderRadius: '0px 4px 4px 0px',
                }}
            >
                {hasPage ? 
                    pageRepo[value[item].pageKey].title
                    :'Empty'
                }
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