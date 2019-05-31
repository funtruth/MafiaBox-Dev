import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    variableType,
} from '../../common/types'

import LogicDeclareValue from '../details/LogicDeclareValue'
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
    rootPath,
}){
    const renderItem = (item) => {
        const variableTypes = item.variableTypes || []

        return (
            <Row key={item.key} style={{margin: 2}}>
                <LogicButton
                    highlight="blue" 
                    style={{
                        color: '#999',
                        marginRight: 6,
                    }}
                >
                    variable
                    <Text size="s" before="xxs">
                        {item.key}
                    </Text>
                </LogicButton>
                <DropClick
                    dropdown={dropdownType.declareVarType}
                    disabled={readOnly}
                    params={{
                        currentValue: variableTypes,
                        path: [...rootPath, 'vars', item.key],
                    }}
                >
                    <LogicButton
                        highlight="blue" 
                        style={{
                            color: '#ddd',
                            marginRight: 6,
                        }}
                    >
                        <Text size="s" color="grey" after="xxs">
                            type
                        </Text>
                        {variableTypes.map(type => type && <i key={type} className={variableType[type].icon}/>)}
                        {variableTypes.length === 0 && '...'}
                    </LogicButton>
                </DropClick>
                {/*<LogicDeclareValue {...props} item={item}/>*/}
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