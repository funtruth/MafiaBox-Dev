import React from 'react'

import {
    Body,
    Button,
    Footer,
    Separator,
    Text,
} from '../../components/Common';

export default function DeleteLogic(props) {
    const onCancel = () => props.showModal()
    const onDelete = () => {
        props.onDelete();
    }

    return (
        <>
            <Body size="s">
                <Text size="l" align="c">Delete logic?</Text>
                <Separator size={8}></Separator>
                <Text color="grey">all logic inside this operator will be deleted as well.</Text>
            </Body>
            <Footer align="r">
                <Button theme="clear" size="s" onClick={onCancel}>Cancel</Button>
                <Button theme="red" size="s" onClick={onDelete} style={{marginLeft: 12}}>Delete</Button>
            </Footer>
        </>
    )
}