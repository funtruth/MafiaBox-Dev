import React from 'react'
import Modal from '../components/Modal';
import {
    Body,
    Button,
    Footer,
    Separator,
    Text,
} from '../../components/Common';

export default function DeleteLogic(props) {
    const onCancel = () => props.close()
    const onDelete = () => {
        props.onDelete();
        props.close();
    }

    return (
        <Modal>
            <Body>
                <Text size="l" align="c">Delete logic?</Text>
                <Separator size={8}></Separator>
                <Text color="grey">all logic inside this operator will be deleted as well.</Text>
            </Body>
            <Footer align="r">
                <Button theme="clear" size="s" onClick={onCancel}>Cancel</Button>
                <Button theme="red" size="s" onClick={onDelete} style={{marginLeft: 12}}>Delete</Button>
            </Footer>
        </Modal>
    )
}