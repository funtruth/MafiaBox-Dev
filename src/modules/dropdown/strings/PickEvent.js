import React from 'react'
import { connect } from 'react-redux'

import { updateSourceType } from '../../common/types';
import { showModal } from '../../modal/ModalReducer'
import { modalType } from '../../modal/types';

function PickEvent(props) {
    const { attach, subfieldKey } = props

    let handlePress = () => {
        props.showModal(modalType.editEvent, {
            attach: attach[subfieldKey] || {},
            updateSource: updateSourceType.topModal,
        })
        props.showDropdown()
    }

    const value = (attach[subfieldKey] && attach[subfieldKey].value) || {}
    
    return (
        Object.keys(value).length ?
            <div
                className="drop-down-menu-option"
                onClick={handlePress}
            >
                <i className="drop-down-menu-icon mdi mdi-calendar"/>
                edit events
            </div>
            :<div
                className="drop-down-menu-option"
                onClick={handlePress}
            >
                <i className="drop-down-menu-icon mdi mdi-calendar-plus"/>
                create event
            </div>
    )
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
    {
        showModal,
    }
)(PickEvent)