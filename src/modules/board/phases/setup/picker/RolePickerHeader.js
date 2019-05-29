import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import {
    fuseType,
    boardType,
    dropdownType,
} from '../../../../common/types'

import { countRoles } from '../../helpers'

import {
    DropClick,
    Row,
    Tag,
    Text,
} from '../../../../components/Common';

function RolePickerHeader(props) {
    const { modeKey, draftInfo, pageRepo, storyRepo,
        tab, setTab, setResults } = props
    const { key: setupKey, title, players, roles } = draftInfo

    const [searchText, setSearchText] = useState('')
    const handleType = (e) => {
        setSearchText(e.target.value)
        setResults(
            _(fuse.search(e.target.value))
                .groupBy(i => i.storyType)
                .map((item, key) => ({
                    key,
                    title: (storyRepo[key] && storyRepo[key].title) || key,
                    data: item,
                }))
                .value()
        )
    }

    const [fuse, setFuse] = useState(null)
    const onSearchFocus = () => {
        setTab(2)
        setFuse(new Fuse(_.toArray(pageRepo), fuseType.searchBoard))
    }

    useEffect(() => {
        refresh(tab)
    }, [tab, setupKey])

    const refresh = (tabIndex) => {
        switch(tabIndex) {
            case 0:
                setResults(
                    _(roles)
                        .map((i, k) => pageRepo[k])
                        .groupBy(i => i.storyType)
                        .map((item, key) => ({
                            key,
                            title: (storyRepo[key] && storyRepo[key].title) || key,
                            data: item,
                        }))
                        .value()
                )
                break
            case 1:
                setResults(
                    _(pageRepo)
                        .filter(i => i.boardType === boardType.roles.key)
                        .groupBy(i => i.storyType)
                        .map((item, key) => ({
                            key,
                            title: (storyRepo[key] && storyRepo[key].title) || key,
                            data: item,
                        }))
                        .value()
                )
                break
            default:
        }
    }
    
    const onTabClick = (index) => {
        setTab(index)
        setSearchText('')
    }

    return (
        <Row
            bg="blackish" color="whitish"
            sizes={['xxs', 'xl']} y="c"
        >
            <DropClick
                dropdown={dropdownType.dropString}
                params={{
                    path: ['modeRepo', modeKey, 'roleSetup', setupKey, 'title'],
                }}
                style={{
                    paddingRight: 10,
                    marginRight: 'auto',
                }}
            >
                <Text size="s" color={title ? 'whitish' : 'grey'}>
                    {title || 'Untitled'}
                </Text>
            </DropClick>
            <Tag
                bg={tab === 0 ? 'violet' : 'charcoal'}
                onClick={() => onTabClick(0)}
                icon="mdi mdi-inbox"
            >
                {`Selected (${countRoles(roles)}/${players})`}
            </Tag>
            <Tag
                bg={tab === 1 ? 'violet' : 'charcoal'}
                onClick={() => onTabClick(1)}
                icon="mdi mdi-library"
            >
                View All
            </Tag>
            <Row sizes={['z', 'xs']}>
                <input
                    className="header-input"
                    value={searchText}
                    placeholder="Search library ..."
                    type="text"
                    onChange={handleType}
                    onFocus={onSearchFocus}
                />
                <i className="header-icon mdi mdi-magnify"></i>
            </Row>
        </Row>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        storyRepo: state.page.storyRepo,
    })
)(RolePickerHeader)