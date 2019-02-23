import React from 'react'
import './logic.css'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import ReactTooltip from 'react-tooltip'

import { droppableType } from '../common/types';

import * as helpers from '../common/helpers'
import * as maptool from './maptool'
import { updateVariables } from './LogicReducer'

import LogicErrors from './components/LogicErrors'
import LogicNewVars from './components/LogicNewVars'
import LogicType from './components/LogicType';
import LogicDownArrow from './components/LogicDownArrow';
import LogicRightArrow from './components/LogicRightArrow';
import LogicPanels from './components/LogicPanels';
import LogicObject from './form/LogicObject';
import LogicVariable from './vars/LogicVariable';

function LogicBlock(props) {
    const rng = helpers.genUID('rng')

    const { pageKey, fieldKey, indexKey, vars, path, updateSource, updateRef, value } = props
    
    const logicInfo = value[indexKey]
    if (!logicInfo) return null
    
    const errors = maptool.compile(indexKey, value)
    const collapsed = logicInfo.collapsed
    const iprops = {
        indexKey,
        logicInfo,
        pageKey,
        fieldKey,
        vars,
        path: [...path, indexKey],
        updateSource,
    }
    
    const newVars = props.updateVariables(logicInfo)
    const isVerticalParent = !logicInfo.source || logicInfo.sourceDir === 'right'
    const isHorizontalChild = logicInfo.sourceDir === 'right'

    return (
        <Droppable
            droppableId={`${droppableType.logic}.${pageKey}.${fieldKey}.${indexKey}.${rng}`}
            type={`ROW/${indexKey}`}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={{
                        marginTop: isVerticalParent ? 0 : 4,
                        marginLeft: isHorizontalChild ? 50 : 0,
                        borderLeft: isVerticalParent ? '1px dashed #666' : null,
                        borderRadius: 2,
                    }}
                >
                    <Draggable key={indexKey} draggableId={indexKey}>
                        {(provided, snapshot) => (
                            <div
                                className="row-nowrap"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                    ...provided.draggableProps.style,
                                    marginBottom: 'auto',
                                    cursor: 'default',
                                    userSelect: 'none',
                                    paddingLeft: 4,
                                }}
                            >
                                <div>
                                    <div className="row-nowrap">
                                        <LogicType {...iprops}/>
                                        <LogicPanels
                                            {...iprops}
                                            path={[...path, indexKey, 'data']}
                                        />
                                    </div>
                                    <LogicNewVars {...iprops} newVars={newVars}/>
                                    <LogicObject
                                        {...iprops}
                                        updateRef={updateRef}
                                        path={[...path, indexKey, 'data']}
                                    />
                                    <LogicVariable {...iprops}/>
                                    <div className="row" style={{ textAlign: 'center' }}>
                                        <LogicDownArrow {...iprops}/>
                                        <LogicErrors errors={errors}/>
                                    </div>
                                </div>
                                <LogicRightArrow {...iprops}/>
                                <ReactTooltip place="right"/>
                            </div>
                        )}
                    </Draggable>
                    {logicInfo.right && 
                        <LogicBlock 
                            {...props}
                            indexKey={logicInfo.right}
                            vars={{
                                ...vars,
                                ...newVars,
                            }}
                        />
                    }
                    {logicInfo.down && 
                        <LogicBlock
                            {...props}
                            indexKey={logicInfo.down}
                            vars={{
                                ...vars,
                                ...newVars,
                            }}
                        />
                    }
                </div>
            )}
        </Droppable>
    )
}

export default connect(
    null,
    {
        updateVariables,
    }
)(LogicBlock)