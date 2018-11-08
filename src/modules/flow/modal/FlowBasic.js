import React from 'react'
import { connect } from 'react-redux'

import { updatePhaseInfo } from '../FlowReducer'

import FormInput from '../../components/FormInput'

class FlowBasic extends React.Component{
    render() {
        const { modalParams, flowInfo } = this.props
        const phaseData = flowInfo[modalParams.phaseId]

        if (!phaseData) return null
        
        const phaseKey = {
            id: phaseData.phaseStoryKey,
            field: 'phaseId',
            label: 'Unique Phase Id',
            onChange: this.props.updatePhaseInfo,
            value: phaseData.phaseId,
        }

        return (
            <div className="flow-modal-page">
                <FormInput { ...phaseKey}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        flowInfo: state.flow.flowInfo,
        modalParams: state.modal.modalParams,
    }),
    {
        updatePhaseInfo,
    }
)(FlowBasic)