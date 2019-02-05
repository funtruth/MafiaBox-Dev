import React from 'react'
import FunctionPageView from '../../functions/FunctionPageView'

class FunctionPageModal extends React.Component {
    render() {
        return (
            <div
                style={{
                    minHeight: 400,
                    minWidth: 600,
                    height: '50vh',
                    width: '65vw',
                    overflow: 'scroll',
                }}
            >
                <FunctionPageView {...this.props}/>
            </div>
        )
    }
}

export default FunctionPageModal