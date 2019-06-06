import React from 'react'
import { useDispatch } from 'react-redux'

import { showModal } from '../ModalReducer'

import {
    Footer,
    Button
} from '../../components/Common'

export default function ModalOptions({children, onFinish, onCancel}) {
    const dispatch = useDispatch();

    const done = () => {
        if (onFinish) {
            onFinish()
        }
    }
    
    const close = () => {
        if (onCancel) {
            onCancel()
            return;
        }

        dispatch(showModal())
    }

    return (
        <Footer align="r">
            {children}
            <Button
                size="s"
                onClick={done}
                style={{marginLeft: 6}}
            >
                Done
            </Button>
            <Button
                theme="clear"
                size="s"
                onClick={close}
                style={{marginLeft: 6}}
            >
                Close
            </Button>
        </Footer>
    )
}