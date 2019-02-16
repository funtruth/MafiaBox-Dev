import React from 'react'
import { DROP_TITLE_HEIGHT } from '../types'

export default class DropTitle extends React.Component {
    render() {
        return (
            <div className="row" style={{ alignItems: 'center', height: DROP_TITLE_HEIGHT }}>
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
                    minWidth: 10,
                }}/>
            </div>
        )
    }
}