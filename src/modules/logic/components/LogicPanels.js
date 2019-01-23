import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'
import { dropdownType } from '../../dropdown/types'
import { comparisonType } from '../types'

class LogicPanels extends React.Component{
    //TODO needs major refactoring
    render() {
        const { pageKey, fieldKey, indexKey, logicInfo, pageRepo, vars } = this.props
        const { data } = logicInfo
        
        const hasPage = pageRepo[data]

        switch(logicInfo.logicType) {
            case logicType.operator.key:
                return (
                    <div>
                        <div
                            className="logic-button app-onclick"
                            menu-type={dropdownType.pickVar}
                            app-onclick-props={JSON.stringify({
                                pageKey,
                                fieldKey,
                                indexKey,
                                subfieldKey: 'var1',
                                currentValue: data.var1,
                                attachVar: vars,
                            })}
                            style={{
                                color: (data.var1 || data[`var1.adjust`]) ? '#fff' : '#868686',
                                borderRadius: '0px 4px 0px 0px',
                            }}
                        >
                            <div className="text-ellipsis">
                                {(data.var1 && data['var1.adjust'] && `${data.var1} + ${data['var1.adjust']}`) ||
                                    data.var1 || data['var1.adjust'] || 'Variable'}
                            </div> 
                        </div>
                        <div
                            className="logic-button app-onclick"
                            menu-type={dropdownType.pickComparison}
                            app-onclick-props={JSON.stringify({
                                pageKey,
                                fieldKey,
                                indexKey,
                                subfieldKey: 'comparison',
                                currentValue: data.comparison,
                            })}
                            style={{
                                color: data.comparison ? '#d6d6d6' : '#868686',
                            }}
                        >
                            <div className="text-ellipsis">
                                {(data.comparison && comparisonType[data.comparison].title) || 'Operator'}
                            </div>
                        </div>
                        <div
                            className="logic-button app-onclick"
                            menu-type={dropdownType.pickVar}
                            app-onclick-props={JSON.stringify({
                                pageKey,
                                fieldKey,
                                indexKey,
                                subfieldKey: 'var2',
                                currentValue: data.var2,
                                attachVar: vars,
                            })}
                            style={{
                                color: (data.var2 || data['var2.adjust']) ? '#fff' : '#868686',
                                borderRadius: '0px 0px 4px 0px',
                            }}
                        >
                            <div className="text-ellipsis">
                                {(data.var2 && data['var2.adjust'] && `${data.var2} + ${data['var2.adjust']}`) ||
                                    data.var2 || data['var2.adjust'] || 'Variable'}
                            </div>
                        </div>
                    </div>
                )
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
            case logicType.function.key:
                return (
                    <div
                        className="logic-button app-onclick"
                        menu-type={dropdownType.pickLibrary}
                        app-onclick-props={JSON.stringify({
                            pageKey,
                            fieldKey,
                            indexKey,
                            currentValue: data,
                        })}
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
            case logicType.return.key:
                return (
                    <div
                        className="logic-button app-onclick"
                        menu-type={dropdownType.returnTypes}
                        app-onclick-props={JSON.stringify({
                            pageKey,
                            fieldKey,
                            indexKey,
                            subfieldKey: 'return',
                            currentValue: data.key,
                            attach: data,
                            attachVar: vars,
                        })}
                        style={{
                            color: '#fff',
                            borderRadius: '0px 4px 4px 0px',
                        }}
                    >
                        {data.key}
                    </div>
                )
            default:
                return (
                    <div
                        className="logic-button app-onclick"
                        menu-type={dropdownType.showLibrary}
                        app-onclick-props={JSON.stringify({
                            pageKey,
                            fieldKey,
                            indexKey,
                            currentValue: data,
                        })}
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
)(LogicPanels)