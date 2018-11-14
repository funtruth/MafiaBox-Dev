import React from 'react'
import { connect } from 'react-redux'
import { fieldIcon } from '../defaults'

import { dropdownType } from '../../app/menu/types'

import AddNewField from '../../page/components/AddNewField'

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
        if (!data) return null
        
        return (
            <div>
                <div className="field-item" style={{ marginBottom: 4 }}>
                    <div className="page-field-label">
                        <i className={`story-option ${fieldIcon.phaseTrigger}`} style={{ width: 16 }}></i>
                        {(fieldInfo && fieldInfo.fieldTitle) || field}
                    </div>
                    <div>
                        {value && value.map(this._renderRow)}
                        <AddNewField
                            pageKey={pageInfo.pageKey}
                            field={field}
                            value={value}
                        />
                    </div>
                </div>
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