import React from 'react'

const test = {
    e: 'happy',
    b: 'sad',
    err: 'happy',
    bee: 'sad',
    eqq: 'happy',
    bcc: 'sad',
}

class LogicNewVars extends React.Component{
    render() {
        return (
            <div className="row" style={{ width: '120px' }}>
                {Object.keys(test).map((item, index) => (
                    <div
                        key={index}
                        className="logic-new-var"
                    >
                        {item}
                    </div>
                ))}
            </div>
        )
    }
}

export default LogicNewVars