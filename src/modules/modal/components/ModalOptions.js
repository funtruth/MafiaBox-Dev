import React from 'react'

import {
    Footer,
    Button
} from '../../components/Common'

export default function ModalOptions(props) {
    return (
        <Footer align="r">
            {props.children}
            <Button theme="grey" size="m" onClick={props.onSave}>Save</Button>
            <Button theme="clear" size="s" onClick={props.onClose} style={{marginLeft: 6}}>Cancel</Button>
        </Footer>
    )
}