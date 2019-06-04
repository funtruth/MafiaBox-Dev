import React from 'react'
import _ from 'lodash'

import { variableType } from '../../common/types';

import { useVarType } from '../../hooks/Hooks';

import StringVarDrag from '../dnd/StringVarDrag';
import { Body, Row, Separator, Text } from '../../components/Common';

export default function EventDetailer(props) {
    const { scopedVars } = props

    const [tameVars, wildVars] = useVarType(
        [variableType.number.key, variableType.string.key],
        scopedVars,
    )

    return (
        <Body style={{flex: 0.35}}>
            <Separator></Separator>
            <Text>Complete</Text>
            <Row>
                {tameVars.map(item => (
                    <StringVarDrag
                        key={item.key}
                        item={item}
                    />
                ))}
            </Row>
            <Separator></Separator>
            <Text>Incomplete</Text>
            <Row>
                {wildVars.map(item => (
                    <StringVarDrag
                        key={item.key}
                        item={item}
                    />
                ))}
            </Row>
        </Body>
    )
}