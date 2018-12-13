import React from 'react'

class LogicErrors extends React.Component{
    render() {
        return (
            this.props.errors.map((item, index) => (
                <i
                    key={index}
                    className={`${item.icon} logic-alert`}
                    style={{
                        color: item.color,
                        fontSize: item.fontSize,
                    }}
                    data-tip={item.text}
                />
            ))
        )
    }
}

export default LogicErrors