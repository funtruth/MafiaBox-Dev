import React from 'react'

import {
    Body,
    Button,
    Footer,
    Separator,
    Text,
} from '../../components/Common';

export default function RemovePriorityRow(props) {
    const onQuit   = () => {
        props.onSave()
    }
    const onCancel = () => props.popModalBy(1)

    return (
        <>
            <Body size="s">
                <Text size="l" align="c">Delete this row?</Text>
                <Separator size={8}></Separator>
                <Text color="grey">roles in this row will be moved to the bottom by default.</Text>
            </Body>
            <Footer align="r">
                <Button theme="red" size="s" onClick={onQuit}>Delete</Button>
                <Button theme="clear" size="s" onClick={onCancel} style={{marginLeft: 12}}>Cancel</Button>
            </Footer>
        </>
    )
}