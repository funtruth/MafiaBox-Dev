import React from 'react'
import { connect } from 'react-redux'

import { showModal } from '../../modal/ModalReducer'

import { modalType } from '../../modal/types'

class ClickMenu extends React.Component{
    _onDelete = () => {
        this.props.showModal(modalType.deleteStory, {
            fieldKey: this.props.fieldKey,
        })
    }

    render() {
        return (
            <div>
                <div className="drop-down-menu-option">
                    <i className={`drop-down-menu-icon ion-ios-git-merge`}></i>
                    Merge
                </div>
                <div className="drop-down-menu-option" onClick={this._onDelete}>
                    <i className={`drop-down-menu-icon ion-ios-trash`}></i>
                    Delete
                </div>
                <div className="drop-down-menu-separator"/>
                <div className="drop-down-menu-option">
                    <i className={`drop-down-menu-icon ion-ios-flag`}></i>
                    Flag
                </div>
                <div className="drop-down-menu-option">
                    <i className={`drop-down-menu-icon ion-ios-bug`}></i>
                    Bug Report
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        showModal,
    }
)(ClickMenu)