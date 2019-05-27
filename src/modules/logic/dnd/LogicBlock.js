import React from 'react'
import _ from 'lodash'

import { DEFAULT_LOGIC } from '../../common/defaults';

import { genUID } from '../../common/helpers';

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
    const { index, logicRepo, logicKey, parentKey, path } = props
    
    //looks at the map that the current LogicView belongs to
    const { childKeys: siblingKeys } = parentKey ? (logicRepo[parentKey]||{}) : logicRepo 
    //looks at the map that the current LogicView is nesting
    const { childKeys } = logicKey ? (logicRepo[logicKey]||{}) : logicRepo

    const handleAdd = () => {
        const newLogicKey = genUID('logic', logicRepo)
        props.updateGeneral(path, {
            [newLogicKey]: DEFAULT_LOGIC,
            childKeys: [newLogicKey],
        })
    }

    const handleAddBelow = () => {
        const newLogicKey = genUID('logic', logicRepo)
        
        const currentClone = _.cloneDeep(siblingKeys)
        currentClone.splice(siblingKeys.indexOf(logicKey) + 1, 0, newLogicKey)

        if (parentKey) {
            props.updateGeneral(path, {
                [newLogicKey]: DEFAULT_LOGIC,
            })
            props.updateGeneral([...path, parentKey], {
                childKeys: currentClone,
            })
        } else {
            props.updateGeneral(path, {
                [newLogicKey]: DEFAULT_LOGIC,
                childKeys: currentClone,
            })
        }
    }

    const moveLogic = (newLogicKey, newIndex) => (oldLogicKey, oldIndex) => {
        const repoClone = _.cloneDeep(logicRepo)
        
        const oldPointer = (oldLogicKey ? repoClone[oldLogicKey] : repoClone).childKeys
        const newPointer = (newLogicKey ? repoClone[newLogicKey] : repoClone).childKeys
        
        const [removed] = oldPointer.splice(oldIndex, 1)
        newPointer.splice(newIndex, 0, removed)

        props.updateGeneral(path, repoClone)
    }
    
    return (
        <Body style={{margin: 4}}>
            {!!logicKey &&
                <div style={{position: 'relative'}}>
                    <LogicItemDrop
                        top
                        index={index}
                        moveLogic={moveLogic(parentKey, index)}
                    />
                    <LogicItemDrop
                        bottom
                        index={index}
                        moveLogic={moveLogic(parentKey, index + 1)}
                    />
                    <LogicItem
                        {...props}
                        logicItem={logicRepo[logicKey] || {}}
                        path={[...path, logicKey]}
                    />
                    <Row>
                        <LogicAddBelow onClick={handleAddBelow}/>
                        <LogicDetails
                            {...props}
                            logicItem={logicRepo[logicKey] || {}}
                            path={[...path, logicKey]}
                        />
                    </Row>
                </div>
            }
            {childKeys &&
                <Body
                    style={{
                        marginTop: 4,
                        marginLeft: logicKey ? 40 : 0,
                        borderLeft: '1px dashed #666',
                    }}
                >
                    {childKeys.map((childKey, index) => (
                        childKey &&
                            <LogicBlock
                                {...props}
                                key={childKey}
                                index={index}
                                logicKey={childKey}
                                parentKey={logicKey}
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