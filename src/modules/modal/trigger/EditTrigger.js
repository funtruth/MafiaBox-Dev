import React from 'react'
import { connect } from 'react-redux'

import { showModal } from '../ModalReducer'

import LogicObject from '../../logic/form/LogicObject';

class EditTrigger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    
    _onCancel = () => {
        this.props.showModal()
    }

    _onSave = () => {
        const { value } = this.state

        if (value && value.trim()) {
            //TODO needs to apply updateViewType
            this.props.showModal()
        } else {
            //highlight red.
        }
    }

    _onChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        const { pageRepo, pageKey, fieldKey, indexKey, subfieldKey, attachVar } = this.props
        //TODO it's either this or update attach
        const iprops = {
            indexKey,
            logicInfo: {
                data: pageRepo[pageKey] && pageRepo[pageKey][fieldKey] && pageRepo[pageKey][fieldKey][indexKey]
                    && pageRepo[pageKey][fieldKey][indexKey].data && pageRepo[pageKey][fieldKey][indexKey].data[subfieldKey]
                    && pageRepo[pageKey][fieldKey][indexKey].data[subfieldKey].value,
            },
            pageKey,
            fieldKey,
            subfieldKey,
            vars: attachVar,
        }
        
        return (
            <div
                cancel-appclick="true"
            >
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        Edit Trigger
                    </div>
                    <div className="modal-subtitle">
                        {`Choose a label for your new field.`}
                    </div>
                    <LogicObject {...iprops}/>
                </div>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" style={{ marginLeft: 'auto' }} onClick={this._onCancel}>
                        {`Cancel`}
                    </div>
                    <div className="modal-button" onClick={this._onSave}>
                        {`Done`}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
    }
)(EditTrigger)