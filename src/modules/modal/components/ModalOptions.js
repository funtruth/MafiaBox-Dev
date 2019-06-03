import React from 'react'
import { useDispatch } from 'react-redux'

import { showModal } from '../ModalReducer'

import {
    Footer,
    Button
} from '../../components/Common'

export default function ModalOptions({children}) {
    const dispatch = useDispatch();

    const close = () => {
        dispatch(showModal())
    }

    return (
        <Footer align="r">
            {children}
            <Button theme="clear" size="s" onClick={close} style={{marginLeft: 6}}>
                Close
            </Button>
        </Footer>
    )
}