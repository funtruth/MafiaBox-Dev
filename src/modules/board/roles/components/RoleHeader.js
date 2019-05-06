import React from 'react'
import { connect } from 'react-redux'

import { boardType } from '../../../fields/defaults'

import {
    addPageToMap,
} from '../../../page/PageReducer'

import {
    Row,
    Tag,
    Text,
} from '../../../components/Common';

function RoleHeader(props) {
    const { storyKey } = props

    const handleAdd = () => {
        props.addPageToMap(storyKey, boardType.roles.key)
    }

    return (
        <Row bg="blackish" color="whitish" size="s" y="c">
            <Text align="c" style={{marginRight: 'auto'}}>Roles</Text>
            <Tag
                icon="mdi mdi-table-plus"
                onClick={handleAdd}
            >
                Add
            </Tag>
        </Row>
    )
}

export default connect(
    null,
    {
        addPageToMap,
    }
)(RoleHeader)