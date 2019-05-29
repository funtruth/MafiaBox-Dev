import React from 'react'
import _ from 'lodash'

import { 
    mathOperatorType,
    variableType,
} from '../../common/types';

import { useVarType } from '../../hooks/Hooks';

import BasicOpDrag from '../dnd/BasicOpDrag';
import {
    Body,
    Row,
    Separator,
    Text,
} from '../../components/Common';

export default function NumberDetailer(props) {
    const { attachVar } = props

    const [tameVars, wildVars] = useVarType(
        variableType.number.key,
        attachVar,
    )

    return (
        <Body style={{flex: 0.35}}>
            <Text>Operators</Text>
            <Row>
                {_.toArray(mathOperatorType).map(item => (
                    <BasicOpDrag
                        key={item.key}
                        item={item}
                    />
                ))}
            </Row>
            <Separator></Separator>
            {/*<Text>Complete</Text>
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
                        isWild
                        item={item}
                    />
                ))}
            </Row>*/}
        </Body>
    )
}