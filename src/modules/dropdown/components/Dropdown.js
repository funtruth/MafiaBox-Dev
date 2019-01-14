import React from 'react'

class Dropdown extends React.Component{
    render() {
        const { children, pageX, pageY } = this.props
        
        return (
            <div
                className="drop-down-menu" 
                style={{
                    position: 'fixed',
                    top: pageY,
                    left: pageX,
                }}>
                {children}
            </div>
        )
    }
}

export default Dropdown