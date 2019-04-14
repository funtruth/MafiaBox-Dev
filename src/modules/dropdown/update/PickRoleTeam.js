import React from 'react'
import  _ from 'lodash'
import { connect } from 'react-redux'

import {
    concatField,
} from '../../logic/proptool'

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
    const { subfieldKey, fieldRepo } = props

    const handleSelect = (item) => {

    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                params={{
                    subfieldKey: concatField(subfieldKey, ROLE_TEAM_KEY),
                    subpath: [concatField(subfieldKey, item.subfield)],
                }}
                onClick={() => handleSelect(item)}
            >
                {item.title}
            </DropItem>
        )
    }
    
    const data = _.sortBy(fieldRepo[ROLE_TEAM_KEY].data, i => i.index)
    return (
        <>
            <DropTitle>subfields</DropTitle>
            {data.map(renderItem)}
        </>
    )
})