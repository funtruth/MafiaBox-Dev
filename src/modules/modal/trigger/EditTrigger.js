import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

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
            //TODO add new story
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
        const { pageKey, fieldKey, indexKey, attach, attachVar } = this.props
        const iprops = {
            indexKey,
            logicInfo: {
                data: attach,
            },
            pageKey,
            fieldKey,
            vars: attachVar,
        }
        
        return (
            <div
                cancel-appclick="true"
            >
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        {`New Field`}
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
        updateRef: proptool.addPlayerRef(state.template),
    }),
    {
        showModal,
    }
)(EditTrigger)