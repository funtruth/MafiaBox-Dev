import React from 'react'
import './logic.css'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import * as maptool from './maptool'
import { updateVariables } from './LogicReducer'

import LogicErrors from './components/LogicErrors'
import LogicType from './components/LogicType';
import LogicOptions from './components/LogicOptions'
import LogicPanels from './components/LogicPanels';
import LogicDetails from './components/LogicDetails';

function LogicBlock(props) {
    //const rng = helpers.genUID('rng')

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
        <div
            style={{
                marginTop: 8,
                marginLeft: isHorizontalChild ? 40 : 0,
                borderLeft: isVerticalParent ? '1px dashed #666' : null,
                borderRadius: 2,
            }}
        >
            <div
                className="row-nowrap"
                style={{
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
            {logicInfo.right && <LogicBlock {...props} indexKey={logicInfo.right} vars={compiledVars}/>}
            {logicInfo.down && <LogicBlock {...props} indexKey={logicInfo.down} vars={compiledVars}/>}
        </div>
    )
}

export default connect(
    null,
    {
        updateVariables,
    }
)(LogicBlock)