import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    variableType,
} from '../../common/types'

import LogicDeclareValue from './LogicDeclareValue'
import {
    Body,
    DropClick,
    LogicButton,
    Row,
    Text,
} from '../../components/Common';

export default function LogicDeclare({
    vars,
    logicKey,
    readOnly,
    path,
}){
    const renderItem = (item) => {
        const variableTypes = item.variableTypes || []
        const varPath = [...path, 'vars', item.key]

        return (
            <Row key={item.key} style={{margin: 2}}>
                <LogicButton
                    highlight="blue"
                    color="grey"
                >
                    new variable
                    <Text size="s" before="xxs">
                        {item.key}
                    </Text>
                </LogicButton>
                <DropClick
                    dropdown={dropdownType.declareVarType}
                    disabled={readOnly}
                    params={{
                        path: varPath,
                    }}
                >
                    <LogicButton
                        highlight="blue" 
                        color="whitish"
                    >
                        <Text size="s" color="grey" after="xxs">
                            type
                        </Text>
                        {variableTypes.map(type => type && <i key={type} className={variableType[type].icon}/>)}
                        {variableTypes.length === 0 && '...'}
                    </LogicButton>
                </DropClick>
                {!readOnly && <LogicDeclareValue item={item} path={varPath}/>}
            </Row>
        )
    }

    const declaredVars = _.filter(vars, i => i.scope === logicKey)

    return (
        <Body>
            {declaredVars.map(renderItem)}
        </Body>
    )
}