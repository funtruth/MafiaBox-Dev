import React from 'react'
import _ from 'lodash'

import { variableType } from '../../common/types';
import { APP_PALETTE } from '../../components/Standards'

import { useVarType } from '../../hooks/Hooks';

import StringColorDrag from '../dnd/StringColorDrag';
import StringVarDrag from '../dnd/StringVarDrag';
import { Body, Row, Separator, Text } from '../../components/Common';

export default function EventDetailer(props) {
    const { scopedVars } = props

    const colors = _.toArray(APP_PALETTE)

    const [tameVars, wildVars] = useVarType(
        [variableType.number.key, variableType.string.key],
        scopedVars,
    )

    return (
        <Body style={{flex: 0.35}}>
            <Text>Text Color</Text>
            <Row>
                {colors.map(item => (
                    <StringColorDrag
                        {...props}
                        key={item}
                        item={item}
                    />
                ))}
            </Row>
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