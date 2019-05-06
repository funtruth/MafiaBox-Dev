import React from 'react'
import { connect } from 'react-redux'

import {
    addModeToPatch,
} from '../../../page/PageReducer'

import {
    Row,
    Tag,
    Text,
} from '../../../components/Common';

function RoleHeader(props) {
    const { storyKey } = props

    const handleAdd = () => props.addModeToPatch(storyKey)

    return (
        <Row bg="blackish" color="whitish" size="s" y="c">
            <Text align="c" style={{marginRight: 'auto'}}>Game modes</Text>
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
        addModeToPatch,
    }
)(RoleHeader)