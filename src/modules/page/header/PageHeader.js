import React from 'react'
import './PageHeader.css'
import { connect } from 'react-redux'

import { navigate } from '../../navigation/NavReducer'
import { publishFromState } from '../PageReducer'
import { showModal } from '../../modal/ModalReducer'

import PageOptions from './PageOptions'
import {
    Row,
    Tag,
} from '../../components/Common';

function PageHeader(props) {
    const { pageKey, pageInfo, published, location, match } = props
    if (match) return null

    const handleResize = () => {
        props.navigate(`${location.pathname}/${pageKey}`)
        props.showModal()
    }

    const handlePublish = () => {
        if (published) return;
        props.publishFromState('pageRepo', pageKey)
        props.updatePage([pageKey, 'publishInfo'], {
            published: true,
            publishedAt: Date.now(),
        })
    }

    return (
        <Row sizes={['xxs', 'xxs']} className="page-header" y="c" bg="transparent">
            <Tag bg="discord" icon="mdi mdi-arrow-expand" onClick={handleResize} style={{marginRight: 'auto'}}>
                Open as Page
            </Tag>
            {!published &&
                <Tag bg="discord" icon="mdi mdi-publish" onClick={handlePublish}>
                    Publish
                </Tag>
            }
            {published &&
                <Tag bg="discord" icon=" mdi mdi-bookmark-check">
                    Published
                </Tag>
            }
            <PageOptions/>
        </Row>
    )
}

export default connect(
    null,
    {
        navigate,
        publishFromState,
        showModal,
    }
)(PageHeader)