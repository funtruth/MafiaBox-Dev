import React from 'react'
import { connect } from 'react-redux'

import { updateSourceType } from '../../common/types';
import { showModal } from '../../modal/ModalReducer'
import { modalType } from '../../modal/types';

class PickTrigger extends React.Component{
    _addTrigger = () => {
        const { attach, subfieldKey } = this.props
        this.props.showModal(modalType.editTrigger, {
            attach: attach[subfieldKey] || {},
            updateSource: updateSourceType.topModal,
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
                    <i className="drop-down-menu-icon mdi mdi-flag"/>
                    edit trigger
                </div>
                :<div
                    className="drop-down-menu-option"
                    onClick={this._addTrigger}
                >
                    <i className="drop-down-menu-icon mdi mdi-flag-plus"/>
                    create trigger
                </div>
        )
    }
}

export default connect(
    null,
    {
        showModal,
    }
)(PickTrigger)