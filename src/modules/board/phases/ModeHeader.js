import React from 'react'

import { dropdownType } from '../../common/types'

import {
    DropClick,
    Row,
    Tag,
    Text,
} from '../../components/Common';

export default function ModeHeader({ slate, modeKey, path, tab, setTab }) {
    const { title, playerNum } = slate
    const { min, max } = playerNum || {}

    const handleAdd = () => {
        return;
    }

    const handlePublish = () => {
        console.warn("TODO")
    }

    return (
        <Row className="--slide-bottom" bg="blackish" color="whitish" sizes={['xs', 'xl']} y="c">
            <DropClick
                dropdown={dropdownType.dropString}
                params={{
                    path: [...path, 'title'],
                    placeholder: "name of game mode ..."
                }}
                style={{
                    paddingRight: 10,
                }}
            >
                <Text color={title ? 'whitish' : 'grey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Tag
                bg={tab === 0 ? 'violet' : 'charcoal'}
                icon="sitemap"
                text="Phases"
                onClick={() => setTab(0)}
            />
            <DropClick
                dropdown={dropdownType.editPlayerNum}
                params={{
                    path: [...path, 'playerNum'],
                }}
            >
                <Tag
                    bg="charcoal"
                    icon="account-multiple"
                    text={`${min||'x'}-${max||'x'} Players`}
                />
            </DropClick>
            <Tag
                bg={tab === 1 ? 'violet' : 'charcoal'}
                icon="clipboard-account-outline"
                text="Role setup"
                onClick={() => setTab(1)}
            />
            <Tag
                bg={tab === 2 ? 'violet' : 'charcoal'}
                onClick={() => setTab(3)}
                icon="checkerboard"
                text="Interface"
                style={{
                    marginRight: 'auto',
                }}
            />
            {tab === 0 &&
                <Tag
                    className="--slide-right"
                    icon="table-plus"
                    text="Add"
                    onClick={handleAdd}
                />
            }
            <Tag
                icon="publish"
                text="Publish"
                onClick={handlePublish}
            />
        </Row>
    )
}