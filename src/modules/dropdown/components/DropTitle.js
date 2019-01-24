import React from 'react'

export default class DropTitle extends React.Component {
    render() {
        return (
            <div className="row" style={{ alignItems: 'center' }}>
                <div style={{
                    height: 2,
                    width: 10,
                    backgroundColor: '#464646',
                }}/>
                <div className="drop-down-title">{this.props.children}</div>
                <div style={{
                    height: 2,
                    flexGrow: 1,
                    backgroundColor: '#464646',
                }}/>
            </div>
        )
    }
}