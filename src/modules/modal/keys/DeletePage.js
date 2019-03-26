import React from 'react'
import { connect } from 'react-redux'

import { removePage } from '../../page/PageReducer' 

import Modal from '../components/Modal';
import Text from '../../components/Text'
import Button from '../../components/Button'
import Body from '../../components/Body'
import Separator from '../../components/Separator'
import Footer from '../../components/Footer'

function DeletePage(props) {
    const { attach, pageKey } = props
    const { title, storyType } = attach

    const handleCancel = () => {
        props.showModal()
    }

    const handleDelete = () => {
        props.removePage(pageKey, storyType)
        props.showModal()
    }
    
    return (
        <Modal>
            <Body>
                <Text size="xl" bold align="c">
                    {`Delete '${title || "Untitled"}'?`}
                </Text>
                <Separator m={10}/>
                <Text size="m" color="grey">Are you sure you want to delete this role?</Text>
            </Body>
            <Footer align="r">
                <Button theme="grey" onClick={handleCancel}>Cancel</Button>
                <Button theme="red" onClick={handleDelete} style={{ marginLeft: 12 }}>Delete</Button>
            </Footer>
        </Modal>
    )
}

export default connect(
    null,
    {
        removePage,
    }
)(DeletePage)