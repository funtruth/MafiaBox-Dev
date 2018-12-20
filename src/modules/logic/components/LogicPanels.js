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
    
    //TODO needs major refactoring
    render() {
        const { item, field, logicInfo, pageInfo, pageRepo } = this.props
        const { pageKey } = pageInfo
        const { data } = logicInfo

        switch(logicInfo.logicType) {
            case logicType.operator.key:
                return (
                    <div>
                        <div
                            className="logic-button menu-onclick"
                            menu-type={dropdownType.pickVar}
                            field-key={field}
                            subfield-key="var1"
                            index-key={item}
                            page-key={pageKey}
                            current-value={data.var1}
                            style={{
                                color: (data.var1 || data[`var1.adjust`]) ? '#fff' : '#868686',
                                borderRadius: '0px 4px 0px 0px',
                            }}
                            onClick={this._onClick}
                        >
                            <div className="text-ellipsis">
                                {(data.var1 && data['var1.adjust'] && data.var1 + " + " + data['var1.adjust']) ||
                                    data.var1 || data['var1.adjust'] || 'Variable'}
                            </div> 
                        </div>
                        <div
                            className="logic-button menu-onclick"
                            menu-type={dropdownType.pickComparison}
                            field-key={field}
                            subfield-key="comparison"
                            index-key={item}
                            page-key={pageKey}
                            current-value={data.comparison}
                            style={{
                                color: data.comparison ? '#d6d6d6' : '#868686',
                            }}
                        >
                            <div className="text-ellipsis">
                                {(data.comparison && comparisonType[data.comparison].title) || 'Operator'}
                            </div>
                        </div>
                        <div
                            className="logic-button menu-onclick"
                            menu-type={dropdownType.pickVar}
                            field-key={field}
                            subfield-key="var2"
                            index-key={item}
                            page-key={pageKey}
                            current-value={data.var2}
                            style={{
                                color: (data.var2 || data['var2.adjust']) ? '#fff' : '#868686',
                                borderRadius: '0px 0px 4px 0px',
                            }}
                            onClick={this._onClick}
                        >
                            <div className="text-ellipsis">
                                {(data.var2 && data['var2.adjust'] && data.var2 + " + " + data['var2.adjust']) ||
                                    data.var2 || data['var2.adjust'] || 'Variable'}
                            </div>
                        </div>
                    </div>
                )
            case logicType.else.key:
            case logicType.update.key:
                return (
                    <div
                        className="logic-button"
                        style={{
                            color: '#868686',
                            borderRadius: '0px 4px 4px 0px',
                        }}
                    >
                        <div className="text-ellipsis">
                            N/A
                        </div>
                    </div>
                )
            default:
                const hasPage = pageRepo[data]
                return (
                    <div
                        className="logic-button menu-onclick"
                        menu-type={dropdownType.showLibrary}
                        field-key={field}
                        index-key={item}
                        page-key={pageKey}
                        current-value={data}
                        style={{
                            color: hasPage ? '#fff' : '#868686',
                            borderRadius: '0px 4px 4px 0px',
                        }}
                    >
                        <div className="text-ellipsis">
                            {hasPage ? 
                                pageRepo[data].title
                                :'Empty'
                            }
                        </div>
                    </div>
                )
        }
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