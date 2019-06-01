import React from 'react'
import  _ from 'lodash'
import { connect } from 'react-redux'

import {
    variableType,
    parseType,
} from '../../common/types';
import {
    LOGIC_ITEM_VAR,
} from '../../common/defaults'

import {
    DropTitle,
    DropItem,
} from '../components/Common'

const ROLE_TEAM_KEY = 'roleTeam'

export default connect(
    state => ({
        fieldRepo: state.page.fieldRepo,
    })
)(function PickRoleTeam(props) {
    const { fieldRepo } = props

    const handleSelect = (item) => {
        props.updatePage({
            ...LOGIC_ITEM_VAR,
            value: item.key,
            display: item.title,
            variableTypes: [
                variableType.string.key,
            ],
            parseBy: parseType.string,
        })
        props.showDropdown();
    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                onClick={() => handleSelect(item)}
                text={item.title}
            />
        )
    }
    
    const data = _.sortBy(fieldRepo[ROLE_TEAM_KEY].data, i => i.index)
    return (
        <>
            <DropTitle>teams</DropTitle>
            {data.map(renderItem)}
        </>
    )
})