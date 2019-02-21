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

class LogicBlock extends React.Component{
    constructor(props) {
        super(props)
        this.rng = helpers.genUID('rng')
    }

    render() {
        const { pageKey, fieldKey, indexKey, vars, updateRef, value } = this.props
        
        const rows = [indexKey]
        let pointer = value[indexKey] && value[indexKey].down

        while(pointer) {
            if (!value[pointer]) break
            rows.push(pointer)
            pointer = value[pointer].down
        }
        
        return (
            <Droppable
                droppableId={`${droppableType.logic}.${pageKey}.${fieldKey}.${indexKey}.${this.rng}`}
                type={`ROW/${indexKey}`}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                    >
                        {rows.map((item, index) => {
                            const logicInfo = value[item]
                            if (!logicInfo) return null

                            const errors = maptool.compile(item, value)
                            const collapsed = logicInfo.collapsed
                            const iprops = {
                                indexKey: item,
                                logicInfo,
                                pageKey,
                                fieldKey,
                                vars,
                            }
                            
                            const newVars = this.props.updateVariables(logicInfo)
                                
                            return <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className="row-nowrap"
                                        key={index}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            marginTop: index ? 10 : 0,
                                            marginBottom: 'auto',
                                            cursor: 'default',
                                            userSelect: 'none',
                                        }}
                                    >
                                        <div>
                                            <div className="row-nowrap">
                                                <LogicType {...iprops}/>
                                                <LogicPanels {...iprops}/>
                                            </div>
                                            <LogicNewVars {...iprops} newVars={newVars}/>
                                            <LogicObject {...iprops} updateRef={updateRef}/>
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
                        })}
                    </div>
                )}
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