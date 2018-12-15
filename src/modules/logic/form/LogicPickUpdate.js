import React from 'react'

class LogicPickUpdate extends React.Component{
    render() {
        const { room } = this.props
        const { dropdownType } = room

        return (
            <div
                className="logic-pick-update menu-onclick"
                menu-type={dropdownType}
                style={{
                    marginLeft: 'auto',
                }}
            >
                {'x'}
            </div>
        )
    }
}

export default LogicPickUpdate