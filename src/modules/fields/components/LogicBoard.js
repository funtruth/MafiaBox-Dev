import React from 'react'
import { connect } from 'react-redux'
import { fieldIcon } from '../defaults'

import { dropdownType } from '../../app/menu/types'

const tempData = [
    {
        title: '-0-',
        right: 1,
        down: 8,
    },
    {
        title: '-1-',
        right: 2,
        down: 3,
    },
    {
        title: '-2-',
    },
    {
        title: '-3-',
        right: 4,
    },
    {
        title: '-4-',
        right: 5,
        down: 6,
    },
    {
        title: '-5-',
    },
    {
        title: '-6-',
        right: 7,
    },
    {
        title: '-7-',
    },
    {
        title: '-8-',
        right: 9,
    },
    {
        title: '-9-',
    },
]

class LogicBlock extends React.Component{
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
                        <div
                            field-key="phaseTriggerMode"
                            subfield-key="to"
                            index-key={index}
                            className="property-button menu-onclick"
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