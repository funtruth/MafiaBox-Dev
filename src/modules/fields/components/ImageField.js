import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'

import { modalType } from '../../modal/types';

import { showModal } from '../../modal/ModalReducer'

function ImageField(props) {
    const handleClick = () => {
        props.showModal(modalType.pickCharacterImage, {

        });
    }

    return (
        <div className="row -x-p">
            <div className="field-tag" onClick={handleClick}>
                TODO
            </div>
        </div>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(ImageField)