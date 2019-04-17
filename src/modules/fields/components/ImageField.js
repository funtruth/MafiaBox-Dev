import React from 'react'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types';

import { showModal } from '../../modal/ModalReducer'

import {
    Body,
    Button,
} from '../../components/Common'

function ImageField(props) {
    const handleClick = () => {
        props.showModal(modalType.pickCharacterImage, {

        });
    }

    return (
        <Body size="s">
            <Button size="s" onClick={handleClick}>
                TODO
            </Button>
        </Body>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(ImageField)