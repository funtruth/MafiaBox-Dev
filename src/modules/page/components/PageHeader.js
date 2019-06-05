import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { navigate } from '../../app/NavReducer'
import { publishFromState, updateGeneral } from '../PageReducer'
import { showModal } from '../../modal/ModalReducer'

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
        <Row
            sizes={['xxs', 'xxs']}
            y="c"
            bg="discord"
            style={{
                position: 'sticky',
                top: 0,
                borderRadius: 4,
                zIndex: 4,
                minHeight: '1.7em',
            }}
        >
            <Tag
                bg="discord"
                icon="arrow-expand"
                text="Open as page"
                onClick={handleResize}
                style={{marginRight: 'auto'}}
            />
            {!published &&
                <Tag
                    bg="discord"
                    icon="publish"
                    text="Publish"
                    onClick={handlePublish}
                />
            }
            {published &&
                <Tag
                    bg="discord"
                    text="Published"
                    icon="bookmark-check"
                />
            }
            <Tag icon="dots-horizontal"></Tag>
        </Row>
    )
}