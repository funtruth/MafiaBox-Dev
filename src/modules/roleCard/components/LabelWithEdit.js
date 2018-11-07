import React from 'react'

class LabelWithEdit extends React.Component{
    render() {
        return (
            <div className="role-label">
                {this.props.label}
                <i className="more-button ion-ios-more"></i>
            </div>
        )
    }
}

export default LabelWithEdit