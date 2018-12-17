import React from 'react'
import { connect } from 'react-redux'

class Dropdown extends React.Component{
    render() {
        const { children, pageX, pageY, dropdownParams } = this.props
        return (
            <div
                className="drop-down-menu" 
                style={{
                    top: dropdownParams.pageY || pageY,
                    left: dropdownParams.pageX || pageX,
                    position: 'fixed'
                }}>
                {children}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
    })
)(Dropdown)