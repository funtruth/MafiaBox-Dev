import React from 'react'
import { connect } from 'react-redux'
import { dropdownType } from '../../app/menu/types'
import { logicType, logicTypeInfo, defaultLogic } from './types'

import { addItemToRightOf, addItemBelowOf } from '../../page/PageReducer'

class LogicBlock extends React.Component{
    _addItemRight = (index) => {
        const { field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemToRightOf(index, pageKey, field)
    }

    _addItemBelow = (index) => {
        const { field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemBelowOf(index, pageKey, field)
    }

    render() {
        let { field, pageInfo, value } = this.props
        if (!pageInfo) return null
        if (!value) {
            value = defaultLogic
        }

        const index = this.props.index || 'START'
        const rows = [index]
        let pointer = value[index].down

        while(pointer) {
            rows.push(pointer)
            pointer = value[pointer].down
        }

        return (
            <div>
                {rows.map((item, index) => (
                    <div className="row" key={index}  style={{marginTop: index ? 8 : 0, marginBottom: 'auto'}}>
                        <div>
                            <div className="row">
                                <i 
                                    className={`${(value[item].logicType &&
                                        logicTypeInfo[value[item].logicType].icon) ||
                                        'ion-md-create'} logic-label menu-onclick`}
                                    menu-type={dropdownType.showLogic}
                                    field-key={field}
                                    index-key={item}
                                    page-key={pageInfo.pageKey}
                                    style={{
                                        backgroundColor: (value[item].logicType &&
                                            logicTypeInfo[value[item].logicType].color) ||
                                            '#767676'
                                    }}
                                />
                                <div
                                    className="logic-button menu-onclick"
                                    menu-type={dropdownType.showAllPhases}
                                    field-key="phaseTriggerMode"
                                    index-key={item}
                                >
                                    {value[item].title}
                                </div>
                                <i className="ion-ios-fastforward logic-button-right"
                                    style={{ color: !value[item].right && '#fff' }}
                                    onClick={this._addItemRight.bind(this, item)}
                                />
                            </div>
                            <div
                                className="logic-button-down"
                                onClick={this._addItemBelow.bind(this, item)}
                            >
                                <i className={index === rows.length - 1 ? "ion-ios-add" : "ion-md-arrow-dropdown"}
                                    style={{ color: index === rows.length - 1 ? '#a6a6a6' : '#fff' }}
                                />
                            </div>
                        </div> 
                        {value[item].right && 
                            <LogicBlock 
                                {...this.props}
                                index={value[item].right}
                            />
                        }
                    </div>
                ))}
            </div>
        )
    }
}

export default connect(
    null,
    {
        addItemToRightOf,
        addItemBelowOf,
    }
)(LogicBlock)