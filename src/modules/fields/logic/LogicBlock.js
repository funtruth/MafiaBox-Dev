import React from 'react'
import { connect } from 'react-redux'
import { dropdownType } from '../../app/menu/types'
import { logicType, logicTypeInfo, defaultLogic } from './types'

import { addItemToRightOf } from '../../page/PageReducer'

class LogicBlock extends React.Component{
    _addItem = (index) => {
        const { field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemToRightOf(index, pageKey, field)
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
                    <div className="row" key={index} style={{marginTop: index ? 8 : 0, marginBottom: 'auto'}}>
                        <div
                            className="logic-label menu-onclick"
                            menu-type={dropdownType.showLogic}
                            field-key={field}
                            index-key={item}
                            page-key={pageInfo.pageKey}
                            style={{
                                backgroundColor: (value[item].logicType &&
                                    logicTypeInfo[value[item].logicType].color) ||
                                    '#767676'
                            }}
                        >
                            <i className={(value[item].logicType &&
                                logicTypeInfo[value[item].logicType].icon) ||
                                'ion-md-create'}/>
                        </div>
                        <div
                            className="logic-button menu-onclick"
                            menu-type={dropdownType.showAllPhases}
                            field-key="phaseTriggerMode"
                            index-key={item}
                        >
                            {value[item].logicType !== logicType.else &&
                                value[item].title}
                        </div>
                        <i className="ion-ios-fastforward"
                            style={{
                                color: value[item].right ? '#a6a6a6' : '#fff',
                                width: 20
                            }}
                            onClick={this._addItem.bind(this, item)}
                        />
                        {value[item].right && 
                            <LogicBlock {...this.props} index={value[item].right}/>
                        }
                    </div>
                ))}
            </div> 
        )
    }
}

export default connect(
    state => ({

    }),
    {
        addItemToRightOf,
    }
)(LogicBlock)