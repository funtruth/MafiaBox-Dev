import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import './logic.css'

import { DEFAULT_LOGIC } from '../common/defaults';

import { genUID } from '../common/helpers';
import { updateGeneral } from '../page/PageReducer'

import {
    Body,
    Row,
    Tag,
} from '../components/Common';
import LogicBlock from './dnd/LogicBlock'
import LogicBlockDrop from './dnd/LogicBlockDrop'
import LogicAddBelow from './components/LogicAddBelow'
import LogicDetails from './components/LogicDetails'

function LogicView(props) {
    const { vars, index, logicRepo, logicKey, parentKey, path, childKeys } = props

    const handleAdd = () => {
        const newLogicKey = genUID('logic', logicRepo)
        props.updatePage(path, {
            [newLogicKey]: DEFAULT_LOGIC,
            childKeys: [newLogicKey],
        })
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
                    <LogicBlockDrop
                        top
                        index={index}
                        logicKey={logicKey}
                        moveLogic={moveLogic(parentKey, index)}
                    />
                    <LogicBlockDrop
                        bottom
                        index={index}
                        logicKey={logicKey}
                        moveLogic={moveLogic(parentKey, index + 1)}
                    />
                    <LogicBlock
                        {...props}
                        logicItem={logicRepo[logicKey] || {}}
                        path={[...path, logicKey]}
                    />
                    <Row>
                        <LogicAddBelow {...props}/>
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
                            <LogicView
                                {...props}
                                key={childKey}
                                index={index}
                                logicKey={childKey}
                                parentKey={logicKey}
                                childKeys={logicRepo[childKey] && logicRepo[childKey].childKeys}
                                vars={{
                                    ...vars,
                                    ...logicRepo.declare,
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

export default connect(
    null,
    {
        updateGeneral,
    }
)(LogicView)