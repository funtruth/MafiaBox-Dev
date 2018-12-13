import React from 'react'
import { logicType } from '../types'

const test = {
    e: 'happy',
    b: 'sad',
    erryyybodydfsdfsdsdfsdf: 'happy',
    bee: 'sad',
    eqq: 'happy',
    bcc: 'sad',
}

class LogicNewVars extends React.Component{
    render() {
        const { item, value } = this.props
        const newVars = value[item].logicType === logicType.function

        if (!newVars) return null

        return (
            <div
                className="row"
                style={{
                    width: 110,
                }}
            >
                {Object.keys(test).map((item, index) => (
                    <div
                        key={index}
                        className="logic-new-var"
                        style={{
                            marginTop: 2,
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        )
    }
}

export default LogicNewVars