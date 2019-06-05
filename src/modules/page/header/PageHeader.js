import React from 'react'
import './PageHeader.css'
import { useSelector, useDispatch } from 'react-redux'

import { navigate } from '../../app/NavReducer'
import { publishFromState, updateGeneral } from '../PageReducer'
import { showModal } from '../../modal/ModalReducer'

import PageOptions from './PageOptions'
import {
    Row,
    Tag,
} from '../../components/Common';

export default function PageHeader(props) {
    const dispatch = useDispatch();
    const path = useSelector(state => state.nav.path)
    
    const { pageKey, published, match } = props
    if (match) return null

    const handleResize = () => {
        dispatch(navigate(`${path}/${pageKey}`))
        dispatch(showModal());
    }

    const handlePublish = () => {
        if (published) return;
        dispatch(publishFromState('pageRepo', pageKey))
        dispatch(updateGeneral({
            path: ['pageRepo', pageKey, 'publishInfo'],
            update: {
                published: true,
                publishedAt: Date.now(),
            }
        }))
    }

    return (
        <Row sizes={['xxs', 'xxs']} className="page-header" y="c" bg="discord">
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