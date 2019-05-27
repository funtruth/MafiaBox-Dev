import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './EditEvent.css'

import { stateByPath, genUID } from '../../common/helpers';

import ModalOptions from '../components/ModalOptions'
import Modal from '../components/Modal'
import StringView from '../../strings/StringView';

function EditEvent(props) {
    const { path } = props

    return (
        <Modal
            style={{
                minWidth: 600,
                width: '75vw',
                height: '60vh',
            }}
        >
            <StringView path={path}/>
            <ModalOptions
                onClose={props.close}
            />
        </Modal>
    )
}

export default connect(
    state => ({
        page: state.page,
    })
)(EditEvent)