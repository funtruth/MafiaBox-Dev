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
import LogicType from './components/LogicType';
import LogicOptions from './components/LogicOptions'
import LogicPanels from './components/LogicPanels';
import LogicDetails from './components/LogicDetails';

function LogicBlock(props) {
    const rng = helpers.genUID('rng')

    const { pageKey, fieldKey, indexKey, vars, subpath, path, updateSource, updateRef, value } = props
    
    const logicInfo = value[indexKey]
    if (!logicInfo) return null
    
    const errors = maptool.compile(indexKey, value)
    //const collapsed = logicInfo.collapsed
    const iprops = {
        indexKey,
        boardInfo: value,
        logicInfo,
        pageKey,
        fieldKey,
        vars,
        path: [...path, indexKey],
        subpath,
        updateSource,
    }
    
    const newVars = props.updateVariables(logicInfo)
    const compiledVars = Object.assign({}, vars, newVars)

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
                        marginTop: 8,
                        marginLeft: isHorizontalChild ? 40 : 0,
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
                                        <LogicPanels {...iprops} path={[...path, indexKey, 'data']}/>
                                        <LogicOptions {...iprops}/>
                                    </div>
                                    <LogicDetails {...iprops} updateRef={updateRef} path={[...path, indexKey, 'data']}/>
                                    <LogicErrors errors={errors}/>
                                </div>
                                <ReactTooltip place="right"/>
                            </div>
                        )}
                    </Draggable>
                    {logicInfo.right && <LogicBlock {...props} indexKey={logicInfo.right} vars={compiledVars}/>}
                    {logicInfo.down && <LogicBlock {...props} indexKey={logicInfo.down} vars={compiledVars}/>}
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