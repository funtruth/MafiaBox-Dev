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

class LogicBlock extends React.PureComponent{
    constructor(props) {
        super(props)
        this.rng = helpers.genUID('rng')
    }

    render() {
        const { pageKey, fieldKey, indexKey, vars, path, updateSource, updateRef, value } = this.props
        
        return (
            <Droppable
                droppableId={`${droppableType.logic}.${pageKey}.${fieldKey}.${indexKey}.${this.rng}`}
                type={`ROW/${indexKey}`}
            >
                {(provided, snapshot) => {
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
                    
                    const newVars = this.props.updateVariables(logicInfo)
                    const isVerticalParent = !logicInfo.source || logicInfo.sourceDir === 'right'
                    
                    return (
                        <div ref={provided.innerRef}>
                        <Draggable key={indexKey} draggableId={indexKey}>
                                {(provided, snapshot) => (
                                    <div
                                        className="row-nowrap"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            marginTop: isVerticalParent ? 0 : 10,
                                            marginBottom: 'auto',
                                            cursor: 'default',
                                            userSelect: 'none',
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
                                        {!collapsed && logicInfo.right && 
                                            <LogicBlock 
                                                {...this.props}
                                                indexKey={logicInfo.right}
                                                vars={{
                                                    ...vars,
                                                    ...newVars,
                                                }}
                                            />
                                        }
                                        <ReactTooltip place="right"/>
                                    </div>
                                )}
                            </Draggable>
                            {logicInfo.down && 
                                <LogicBlock
                                    {...this.props}
                                    indexKey={logicInfo.down}
                                    vars={{
                                        ...vars,
                                        ...newVars,
                                    }}
                                />
                            }
                        </div>
                    )
                }}
            </Droppable>
        )
    }
}

export default connect(
    null,
    {
        updateVariables,
    }
)(LogicBlock)