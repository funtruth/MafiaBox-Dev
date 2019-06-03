import React from 'react'

import {
    Footer,
    Button
} from '../../components/Common'

export default function ModalOptions(props) {
    return (
        <Footer align="r">
            {props.children}
            <Button theme="clear" size="s" onClick={props.onClose} style={{marginLeft: 6}}>Close</Button>
        </Footer>
    )
}