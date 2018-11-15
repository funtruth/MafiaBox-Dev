import React from 'react'
import { connect } from 'react-redux'
import { fieldIcon } from '../defaults'

import { dropdownType } from '../../app/menu/types'
import { logicType } from '../logic/types'

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
    _getLogicLabel(type) {
        switch(type) {
            case logicType.if:
                return 'if'
            case logicType.else:
                return 'else'
            case logicType.elseif:
                return 'else if'
            case logicType.return:
                return 'return'
            default:
                return
        }
    }

    render() {
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
                    <div className="row" key={index}>
                        <div className="logic-label">
                            {this._getLogicLabel(tempData[item].logicType)}
                        </div>
                        <div
                            field-key="phaseTriggerMode"
                            subfield-key="to"
                            index-key={index}
                            className="logic-button menu-onclick"
                            menu-type={dropdownType.showAllPhases}
                        >
                            {tempData[item].title}
                        </div>
                        {tempData[item].right && 
                            <i className="ion-ios-fastforward"
                                style={{ color: '#a6a6a6', width: 20 }}>
                            </i>
                        }
                        {tempData[item].right && 
                            <LogicBlock index={tempData[item].right}/>
                        }
                    </div>
                ))}
            </div>
                
        )
    }
}

class LogicBoard extends React.Component{
    _renderRow = (item, index) => {
        return (
            <div key={index} className="row" style={{marginBottom: 8}}>
                {this._renderTrigger(item.mode, index)}
                <i className="ion-ios-fastforward" style={{ color: '#a6a6a6', width: 20 }}></i>
                {this._renderPhase(item.to, index)}
            </div>
        )
    }

    _renderPhase = (to, index) => {
        const { pageInfo, value, pageRepo } = this.props
        const pageKey = value[index].to

        return (
            <div
                key={to}
                field-key="phaseTriggerMode"
                page-key={pageInfo.pageKey}
                subfield-key="to"
                index-key={index}
                className="property-button menu-onclick"
                menu-type={dropdownType.showAllPhases}
            >
                {(pageKey && pageRepo[pageKey].title) || 'None'}
            </div>
        )
    }

    render() {
        const { fieldInfo, field, pageInfo, data, value } = this.props
        
        return (
            <div className="field-item" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.phaseTrigger}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
                </div>
                <LogicBlock/>
            </div>
        )
    }
}

export default connect(
    state => ({
        
    }),
    {

    }
)(LogicBoard)