import React from 'react'

class LogicArgs extends React.Component{
    render() {
        const { vars } = this.props
        if (!vars) return null

        return (
            <div className="row logic-variable-label">
                Variables:
                {Object.keys(vars).map((item, index) => (
                    <div
                        key={index}
                        className="logic-new-var --var"
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

export default LogicArgs