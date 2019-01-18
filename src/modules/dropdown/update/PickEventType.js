import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { showModal, updateTopModal } from '../../modal/ModalReducer'
import { modalType } from '../../modal/types';

class PickEventType extends React.Component{
    _onAdd = () => {
        const { tagKey } = this.props
        this.props.updateTopModal(
            'attach',
            'value',
            Date.now(),
            {
                key: tagKey,
            }
        )
        this.props.showDropdown()
    }

    _onEdit = () => {
        const { tagKey } = this.props
        this.props.showModal(modalType.TextEditor, {
            stringKey: tagKey,
        })
        this.props.showDropdown()
    }

    render() {
        return (
            <div>
                <div
                    className="drop-down-menu-option"
                    onClick={this._onAdd}
                >
                    <i className="drop-down-menu-icon mdi mdi-calendar-plus"/>
                    add event to update
                </div>
                <div
                    className="drop-down-menu-option"
                    onClick={this._onEdit}
                >
                    <i className="drop-down-menu-icon mdi mdi-calendar-text"/>
                    edit event
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
        updateTopModal,
    }
)(PickEventType)