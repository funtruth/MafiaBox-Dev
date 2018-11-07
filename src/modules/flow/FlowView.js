import React from 'react'
import './flow.css'
import FlowBoard from './components/FlowBoard';

class FlowView extends React.Component{
    render() {
        return (
            <div className="story-view">
                <FlowBoard/>
            </div>
        )
    }
}

export default FlowView