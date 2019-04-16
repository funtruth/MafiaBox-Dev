import React from 'react'
import './logic.css'
import ReactTooltip from 'react-tooltip'

//import LogicErrors from './components/LogicErrors'
import LogicType from './components/LogicType';
import LogicAddBelow from './components/LogicAddBelow'
import LogicOptions from './components/LogicOptions'
import LogicPanels from './components/LogicPanels';
import LogicDetails from './components/LogicDetails';

export default function LogicBlock(props) {
    //const rng = helpers.genUID('rng')
    const { vars, path, value, indent, showBorderLeft } = props
    if (!value) return null

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
                {/*<LogicErrors errors={errors}/>*/}
                <LogicOptions {...props}/>
            </div>
            <div className="row-nowrap">
                <LogicAddBelow {...props}/>
                <LogicDetails {...props}/>
            </div>
            <ReactTooltip place="right"/>
            <LogicBlock
                {...props}
                indent={true}
                showBorderLeft={true}
                value={value.right}
                parentValue={value}
                sourceValue={value}
                path={[...path, 'right']}
                vars={{
                    ...vars,
                    ...value.declare,
                }}
            />
            <LogicBlock
                {...props}
                indent={false}
                showBorderLeft={false}
                value={value.down}
                parentValue=""
                sourceValue={value}
                path={[...path, 'down']}
                vars={{
                    ...vars,
                    ...value.declare,
                }}
            />
        </div>
    )
}