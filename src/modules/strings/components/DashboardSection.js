import React from 'react'
import { connect } from 'react-redux'

import { screenType } from '../types'
import { dropdownType } from '../../dropdown/types'

import { stringNavigate } from '../StringReducer'

class DashboardSection extends React.Component {
    _onUpdate = (item) => {
        this.props.stringNavigate(screenType.update, item.key)
    }

    render() {
        const { data, title, editOnly } = this.props

        if (!data.length) return null

        return (
            <div>
                <div className="drop-down-menu-separator"/>
                <div className="dashboard-section-title">{title}</div>
                <div className="row dashboard-results">
                    {data.map(item => {
                        if(editOnly) {
                            return (
                                <div
                                    key={item.key}
                                    highlight="true"
                                    className="dashboard-item"
                                    onClick={this._onUpdate}
                                >
                                    <div className="dashboard-item-title">
                                        {item.title}
                                    </div>
                                    {item.string}
                                </div>
                            )
                        }

                        return (
                            <div
                                key={item.key}
                                highlight="true"
                                className="dashboard-item app-onclick"
                                menu-type={dropdownType.pickEventType}
                                page-key={item.key}
                            >
                                <div
                                    className="dashboard-item-title"
                                    style={{
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {item.title}
                                </div>
                                {item.string}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        stringNavigate,
    }
)(DashboardSection)