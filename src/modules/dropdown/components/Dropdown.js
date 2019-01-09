import React from 'react'

class Dropdown extends React.Component{
    render() {
        const { children, pageX, pageY } = this.props
        
        return (
            <div
                className="drop-down-menu" 
                style={{
                    top: pageY,
                    left: pageX,
                    position: 'fixed'
                }}>
                {children}
            </div>
        )
    }
}

export default Dropdown