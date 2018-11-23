import React from 'react'
import { connect } from 'react-redux'
import { fieldIcon } from '../defaults'
import SeeCodeButton from '../../page/components/SeeCodeButton';

import { dropdownType } from '../../app/menu/types'
import { phaseTriggerCode, phaseTriggerTitle } from '../actions'

import CodeBlock from '../../page/components/CodeBlock';
import AddNewField from '../../page/components/AddNewField'

class PhaseTriggerField extends React.Component{
    state = {
        value: '',
        visible: false,
    }

    _showCode = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    _onUpdate = (editor, data, value) => {

    }

    _renderRow = (item, index) => {
        return (
            <div key={index} className="row" style={{marginBottom: 8}}>
                {this._renderTrigger(item.mode, index)}
                <i className="ion-ios-fastforward" style={{ color: '#a6a6a6', width: 20 }}></i>
                {this._renderPhase(item.to, index)}
            </div>
        )
    }

    _renderTrigger = (mode, index) => {
        const { pageInfo } = this.props

        return (
            <div
                key={mode}
                field-key="phaseTriggerMode"
                page-key={pageInfo.pageKey}
                subfield-key="mode"
                index-key={index}
                className="property-button menu-onclick"
                menu-type={dropdownType.showOtherOptions}
            >
                {phaseTriggerTitle[mode]}
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
                menu-type={dropdownType.showLibrary}
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
                        <SeeCodeButton
                            onClick={this._showCode}
                        />
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
                <CodeBlock
                    visible={this.state.visible}
                    value={phaseTriggerCode[value]}
                    updateCode={this._onUpdate}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    })
)(PhaseTriggerField)