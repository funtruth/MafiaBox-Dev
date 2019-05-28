import React from 'react'
import _ from 'lodash'

import { Row, Text } from '../../components/Common';

export default function DropEmpty({list, text}) {
    if (_.isArray(list)) {
        if (list.length > 0) return null
    }
    return (
        <Row sizes={['xxs', 'm']}>
            <Text color="grey" size="s">
                {text}
            </Text>
        </Row>
    )
}