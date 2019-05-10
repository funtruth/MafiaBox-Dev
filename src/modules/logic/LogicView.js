import React from 'react'
import './logic.css'

import { DEFAULT_LOGIC } from '../common/defaults';

import { genUID } from '../common/helpers';

import {
    Body,
    Row,
    Tag,
} from '../components/Common';
import LogicBlock from './LogicBlock'
import LogicAddBelow from './components/LogicAddBelow'
import LogicDetails from './components/LogicDetails'

export default function LogicView(props) {
    const { vars, value, logicKey, path, childKeys } = props

    const handleAdd = () => {
        const newLogicKey = genUID('logic', value)
        props.updatePage(path, {
            [newLogicKey]: DEFAULT_LOGIC,
            childKeys: [newLogicKey],
        })
    }
    
    return (
        <Body style={{margin: 4}}>
            {!!logicKey &&
                <Body>
                    <LogicBlock
                        {...props}
                        logicItem={value[logicKey] || {}}
                        path={[...path, logicKey]}
                    />
                    <Row>
                        <LogicAddBelow {...props}/>
                        <LogicDetails
                            {...props}
                            logicItem={value[logicKey] || {}}
                            path={[...path, logicKey]}
                        />
                    </Row>
                </Body>
            }
            {childKeys &&
                <Body
                    style={{
                        marginTop: 4,
                        marginLeft: logicKey ? 40 : 0,
                        borderLeft: '1px dashed #666',
                    }}
                >
                    {childKeys.map(childKey => (
                        <LogicView
                            {...props}
                            key={childKey}
                            logicKey={childKey}
                            parentKey={logicKey}
                            childKeys={value[childKey] && value[childKey].childKeys}
                            vars={{
                                ...vars,
                                ...value.declare,
                            }}
                        />
                    ))}
                </Body>
            }
            {!logicKey && !childKeys &&
                <Tag
                    onClick={handleAdd}
                >
                    add logic
                </Tag>
            }
        </Body>
    )
}