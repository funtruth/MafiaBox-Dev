import React from 'react'
import _ from 'lodash'

import { returnType } from '../../../common/types'

import {
    Row,
    Tag,
    Text,
} from '../../../components/Common';

export default function EditToastHeader({
    slate,
    update,
}){
    const handleSelect = (key) => {
        update({
            key,
            display: key,
        })
    }

    const renderItem = (item) => {
        const { key, icon } = item
        const chosen = slate.key === key

        return (
            <Tag
                key={key}
                onClick={() => handleSelect(key)}
                icon={icon}
                text={key}
                color={chosen ? 'whitish' : 'darkgrey'}
                bg={chosen ? 'darkgrey' : 'charcoal'}
            />
        )
    }

    const data = _.orderBy(returnType, i => i.index)

    return (
        <Row y="c">
            <Text>Return type</Text>
            {data.map(renderItem)}
        </Row>
    )
}