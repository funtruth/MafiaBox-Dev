import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types';

import {
    concatField,
    getSubfields,
} from '../../logic/proptool'

import {
    DropParent,
    DropTitle,
} from '../components/Common'

const TAGS_KEY = 'playerTags'

export default connect(
    state => ({
        fieldRepo: state.page.fieldRepo,
    })
)(function PickRoleSubfields(props) {
    const { subfieldKey, fieldRepo } = props

    const subfields = getSubfields(subfieldKey)
    const tags = _.sortBy(fieldRepo[TAGS_KEY].data, i => i.index)
    
    return (
        <>
            <DropTitle>subfields</DropTitle>
            {subfields.map(item => (
                <DropParent
                    key={item.subfield}
                    dropdown={item.dropdown}
                    params={{
                        subfieldKey: concatField(subfieldKey, item.subfield),
                        subpath: [concatField(subfieldKey, item.subfield)],
                    }}
                    text={item.subfield}
                />
            ))}
            <DropTitle>tags</DropTitle>
            {tags.map(item => (
                <DropParent
                    key={item.key}
                    dropdown={dropdownType.pickBoolean}
                    params={{
                        subfieldKey: concatField(subfieldKey, item.title),
                        subpath: [concatField(subfieldKey, item.title)],
                    }}
                    text={item.title}
                />
            ))}
        </>
    )
})