import React from 'react'
import LabelWithEdit from './LabelWithEdit';

class BlurInputItem extends React.Component{
    render() {
        return (
            <div className="field-wrapper">
                <LabelWithEdit label={this.props.label}/>
                <div className="blur-item">
                    {this.props.value}
                </div>
            </div>
        )
    }
}

export default BlurInputItem