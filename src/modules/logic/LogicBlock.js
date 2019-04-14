import React from 'react'
import './logic.css'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

//import * as maptool from './maptool'
import { updateVariables } from './LogicReducer'

//import LogicErrors from './components/LogicErrors'
import LogicType from './components/LogicType';
import LogicAddBelow from './components/LogicAddBelow'
import LogicOptions from './components/LogicOptions'
import LogicPanels from './components/LogicPanels';
import LogicDetails from './components/LogicDetails';

function LogicBlock(props) {
    //const rng = helpers.genUID('rng')
    const { vars, path, value, indent, showBorderLeft } = props
    if (!value) return null
    
    //const errors = maptool.compile(indexKey, value)
    //const collapsed = logicInfo.collapsed
    
    const newVars = props.updateVariables(value)
    const compiledVars = Object.assign({}, vars, newVars)

    return (
        <div
            style={{
                marginTop: 2,
                marginLeft: indent ? 40 : 0,
                borderLeft: showBorderLeft ? '1px dashed #666' : null,
                font: '500 13px Segoe UI',
            }}
        >
            <div className="row-nowrap" style={{ paddingLeft: 2 }}>
                <LogicType {...props}/>
                <LogicPanels {...props}/>
                <LogicOptions {...props}/>
            </div>
            <div className="row-nowrap">
                <LogicAddBelow {...props}/>
                <LogicDetails {...props}/>
            </div>
            {/*<LogicErrors errors={errors}/>*/}
            <ReactTooltip place="right"/>
            <LogicBlock
                {...props}
                indent={true}
                showBorderLeft={true}
                value={value.right}
                parentValue={value}
                sourceValue={value}
                path={[...path, 'right']}
                vars={compiledVars}
            />
            <LogicBlock
                {...props}
                indent={false}
                showBorderLeft={false}
                value={value.down}
                parentValue=""
                sourceValue={value}
                path={[...path, 'down']}
                vars={compiledVars}
            />
        </div>
    )
}

export default connect(
    null,
    {
        updateVariables,
    }
)(LogicBlock)