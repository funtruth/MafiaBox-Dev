import React from 'react'

import {
    Body,
    Row,
    Tag,
} from '../../components/Common';
import LogicItem from './LogicItem'
import LogicItemDrop from './LogicItemDrop'
import LogicAddBelow from '../components/LogicAddBelow'
import LogicDetails from '../components/LogicDetails'

export default function LogicBlock(props) {
    const { index, logicRepo, logicMap, logicKey, parentKey, path, scope } = props

    if (!logicKey && !logicMap) {
        return (
            <Tag onClick={props.handleAdd}>
                add logic
            </Tag>
        )
    }

    //grab current logicItem
    const logicItem = logicRepo[logicKey] || {}

    //looks at the map that the current LogicView belongs to
    const siblingKeys = parentKey ? (logicRepo[parentKey]||{}).byIndex : logicMap 
    //looks at the map that the current LogicView is nesting
    const byIndex = logicKey ? logicItem.byIndex : logicMap

    const handleAddBelow = () => props.handleAddBelow(parentKey, logicKey, siblingKeys)
    
    return (
        <Body>
            {!!logicKey &&
                <div style={{position: 'relative'}}>
                    <LogicItemDrop
                        top
                        index={index}
                        moveLogic={props.moveLogic(parentKey, index)}
                    />
                    <LogicItemDrop
                        bottom
                        index={index}
                        moveLogic={props.moveLogic(parentKey, index + 1)}
                    />
                    <LogicItem
                        {...props}
                        logicItem={logicItem}
                        path={[...path, 'byId', logicKey]}
                    />
                    <Row>
                        <LogicAddBelow onClick={handleAddBelow}/>
                        <LogicDetails
                            {...props}
                            logicItem={logicItem}
                            path={[...path, 'byId', logicKey]}
                        />
                    </Row>
                </div>
            }
            {byIndex &&
                <Body
                    style={{
                        marginLeft: logicKey ? 40 : 0,
                        borderLeft: '1px dashed #666',
                    }}
                >
                    {byIndex.map((childKey, index) => (
                        childKey &&
                            <LogicBlock
                                {...props}
                                key={childKey}
                                index={index}
                                logicKey={childKey}
                                parentKey={logicKey}
                                scope={[...scope, childKey]}
                            />
                    ))}
                </Body>
            }
        </Body>
    )
}