import React from 'react'
import { dropdownType } from '../../app/menu/types'
import { logicType, logicTypeInfo } from './types'

import AddCondition from './AddCondition'

const tempData = [
    {
        title: '- 0 -',
        right: 1,
        down: 8,
        logicType: logicType.if,
    },
    {
        title: '- 1 -',
        right: 2,
        down: 3,
        logicType: logicType.if,
    },
    {
        title: '- 2 -',
        logicType: logicType.return,
    },
    {
        title: '- 3 -',
        right: 4,
        logicType: logicType.else,
    },
    {
        title: '- 4 -',
        right: 5,
        down: 6,
        logicType: logicType.if,
    },
    {
        title: '- 5 -',
        logicType: logicType.return,
    },
    {
        title: '- 6 -',
        right: 7,
        logicType: logicType.elseif,
    },
    {
        title: '- 7 -',
        logicType: logicType.return,
    },
    {
        title: '- 8 -',
        right: 9,
        logicType: logicType.else,
    },
    {
        title: '- 9 -',
        logicType: logicType.return,
    },
]

class LogicBlock extends React.Component{
    render() {
        const { field, pageInfo } = this.props
        if (!pageInfo) return null

        const index = this.props.index || 0
        const rows = [index]
        let pointer = tempData[index].down

        while(pointer) {
            rows.push(pointer)
            pointer = tempData[pointer].down
        }

        return (
            <div>
                {rows.map((item, index) => (
                    <div style={{marginTop: index ? 8 : 0, marginBottom: 'auto'}}>
                        <div className="row" key={index} >
                            <div
                                className="logic-label menu-onclick"
                                menu-type={dropdownType.showLogic}
                                field-key={field}
                                index-key={index}
                                page-key={pageInfo.pageKey}
                                style={{
                                    backgroundColor: logicTypeInfo[tempData[item].logicType].color
                                }}
                            >
                                <i className={logicTypeInfo[tempData[item].logicType].icon}/>
                            </div>
                            <div
                                className="logic-button menu-onclick"
                                menu-type={dropdownType.showAllPhases}
                                field-key="phaseTriggerMode"
                                index-key={index}
                            >
                                {tempData[item].logicType !== logicType.else &&
                                    tempData[item].title}
                            </div>
                            <i className="ion-ios-fastforward"
                                style={{
                                    color: tempData[item].right ? '#a6a6a6' : '#fff',
                                    width: 20
                                }}>
                            </i>
                            {tempData[item].right && 
                                <LogicBlock index={tempData[item].right} field={field} pageInfo={pageInfo}/>
                            }
                        </div>
                    </div>
                ))}
            </div>
                
        )
    }
}

export default LogicBlock