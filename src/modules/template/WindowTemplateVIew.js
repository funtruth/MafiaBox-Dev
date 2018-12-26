import React from 'react'
import FieldTemplateView from '../fields/FieldTemplateView';

class WindowTemplateView extends React.Component {
    render() {
        const { match } = this.props
        const { boardType } = match.params

        return (
            <div className="story-view">
                <FieldTemplateView boardType={boardType}/>
            </div>
        )
    }
}

export default WindowTemplateView