import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useSelector } from 'react-redux'
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
    Icon,
} from '../../../../components/Common';

export default function RolePickerHeader(props) {
    const { storyRepo, pageRepo } = useSelector(state => state.page)
    const { path, draftInfo, tab, setTab, setResults } = props
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
                    path: [...path, 'title'],
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
                icon="inbox"
                text={`Selected (${countRoles(roles)}/${players})`}
            />
            <Tag
                bg={tab === 1 ? 'violet' : 'charcoal'}
                onClick={() => onTabClick(1)}
                icon="library"
                text="View all"
            />
            <Row sizes={['z', 'xs']}>
                <input
                    className="header-input"
                    value={searchText}
                    placeholder="Search library ..."
                    type="text"
                    onChange={handleType}
                    onFocus={onSearchFocus}
                />
                <Icon icon="magnify"/>
            </Row>
        </Row>
    )
}