import React from 'react'

class Dropdown extends React.Component{
    render() {
        const { children, pageX, pageY, zIndex } = this.props
        
        return (
            <div
                className="drop-down-menu" 
                style={{
                    position: 'fixed',
                    top: pageY,
                    left: pageX,
                    zIndex,
                }}>
                {children}
            </div>
        )
    }
}

export default Dropdown