import React from 'react'
import { connect } from 'react-redux'

import { logicType } from '../types'
import { dropdownType } from '../../dropdown/types'

import { addItemBelowOf } from '../../fields/FieldReducer'

class LogicPanels extends React.Component{
    render() {
        const { item, field, value, pageInfo, pageRepo } = this.props
        const isOperator = value[item].logicType === logicType.operator
        
        const hasPage = pageRepo[value[item].pageKey]

        if (isOperator) return (
            <div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.showLibrary}
                    field-key={field}
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    style={{
                        color: hasPage ? '#fff' : '#868686',
                        borderRadius: '0px 4px 0px 0px',
                    }}
                >
                    {hasPage ? 
                        pageRepo[value[item].pageKey].title
                        :'Empty'
                    }
                </div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.showLibrary}
                    field-key={field}
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    style={{
                        color: hasPage ? '#fff' : '#868686',
                    }}
                >
                    {hasPage ? 
                        pageRepo[value[item].pageKey].title
                        :'Empty'
                    }
                </div>
                <div
                    className="logic-button menu-onclick"
                    menu-type={dropdownType.showLibrary}
                    field-key={field}
                    index-key={item}
                    page-key={pageInfo.pageKey}
                    style={{
                        color: hasPage ? '#fff' : '#868686',
                        borderRadius: '0px 0px 4px 0px',
                    }}
                >
                    {hasPage ? 
                        pageRepo[value[item].pageKey].title
                        :'Empty'
                    }
                </div>
            </div>
        )

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
    }
)(LogicPanels)