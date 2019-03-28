import React from 'react'
import './logic.css'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

//import * as maptool from './maptool'
import { updateVariables } from './LogicReducer'

//import LogicErrors from './components/LogicErrors'
import LogicType from './components/LogicType';
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
                marginTop: 4,
                marginLeft: indent ? 40 : 0,
                borderLeft: showBorderLeft ? '1px dashed #666' : null,
                borderRadius: 2,
                font: '500 13px Segoe UI',
            }}
        >
            <div className="row-nowrap" style={{ paddingLeft: 4 }}>
                <LogicType {...props}/>
                <div>
                    <div className="row">
                        <LogicPanels {...props}/>
                        <LogicOptions {...props}/>
                    </div>
                    <LogicDetails {...props} path={[...path, 'data']}/>
                </div>
            </div>
            {/*<LogicErrors errors={errors}/>*/}
            <ReactTooltip place="right"/>
            <LogicBlock
                {...props}
                indent={true}
                showBorderLeft={true}
                value={value.right}
                path={[...path, 'right']}
                vars={compiledVars}
            />
            <LogicBlock
                {...props}
                indent={false}
                showBorderLeft={false}
                value={value.down}
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