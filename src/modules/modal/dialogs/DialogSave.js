import React from 'react'
import Modal from '../components/Modal';
import {
    Body,
    Button,
    Footer,
    Separator,
    Text,
} from '../../components/Common';

export default function DialogSave(props) {
    const onSave    = () => props.onSave()
    const onCancel  = () => props.popModalBy(1)
    const onQuit    = () => props.popModalBy(2)

    return (
        <Modal>
            <Body size="s">
                <Text size="l" align="c">Save changes?</Text>
                <Separator size={8}></Separator>
                <Text color="grey">your changes will be lost if you do not save.</Text>
            </Body>
            <Footer align="l">
                <Button theme="grey" size="s" onClick={onSave}>Save</Button>
                <Button theme="red" size="s" onClick={onQuit} style={{marginLeft: 12}}>Don't Save</Button>
                <Button theme="clear" size="s" onClick={onCancel} style={{marginLeft: 'auto'}}>Cancel</Button>
            </Footer>
        </Modal>
    )
}