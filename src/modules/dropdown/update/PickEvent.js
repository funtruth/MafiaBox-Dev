import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { showModal } from '../../modal/ModalReducer'
import { modalType } from '../../modal/types';

class PickEvent extends React.Component{
    _addTrigger = () => {
        const { attach, subfieldKey } = this.props
        this.props.showModal(modalType.editEvent, {
            attach: attach[subfieldKey] || {}
        })
        this.props.showDropdown()
    }

    render() {
        const { subfieldKey, attach } = this.props
        const value = (attach[subfieldKey] && attach[subfieldKey].value) || {}
        
        return (
            Object.keys(value).length ?
                <div
                    className="drop-down-menu-option"
                    onClick={this._addTrigger}
                >
                    <i className="drop-down-menu-icon mdi mdi-calendar"/>
                    edit events
                </div>
                :<div
                    className="drop-down-menu-option"
                    onClick={this._addTrigger}
                >
                    <i className="drop-down-menu-icon mdi mdi-calendar-plus"/>
                    create event
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
)(PickEvent)