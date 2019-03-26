import React from 'react'

import {
    Footer,
    Button
} from '../../components/Common'

export default function ModalOptions(props) {
    return (
        <Footer align="r">
            <Button theme="grey" size="s" onClick={props.onSave}>Save</Button>
            <Button theme="clear" size="s" onClick={props.onClose} style={{marginLeft: 6}}>Cancel</Button>
        </Footer>
    )
}