import React from 'react'
import { connect } from 'react-redux'

import { removeStory } from '../../page/PageReducer'

import Modal from '../components/Modal'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Body from '../../components/Body'
import Separator from '../../components/Separator'
import Footer from '../../components/Footer'

function DeleteStory(props) {
    const { boardType, storyKey, storyRepo } = props
    const storyInfo = storyRepo[storyKey] || {}

    const { title } = storyInfo

    const handleCancel = () => {
        props.showModal()
    }

    const handleDelete = () => {
        props.removeStory(boardType, storyKey)
        props.showModal()
    }
    
    return (
        <Modal>
            <Body>
                <Text size="l" bold align="c">
                    {`Delete '${title || "Untitled"}'?`}
                </Text>
                <Separator size={10}/>
                <Text size="m" color="grey">
                    {`Are you sure you want to delete '${title || "Untitled"}'?`}
                </Text>
            </Body>
            <Footer align="r">
                <Button theme="grey" onClick={handleCancel}>Cancel</Button>
                <Button theme="red" onClick={handleDelete} style={{marginLeft: 12}}>Delete</Button>
            </Footer>
        </Modal>
    )
}

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
    }),
    {
        removeStory,
    }
)(DeleteStory)