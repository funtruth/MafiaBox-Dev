import React from 'react'
import ReactTooltip from 'react-tooltip'

class LogicErrors extends React.Component{
    componentDidUpdate() {
        ReactTooltip.rebuild()
    }

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