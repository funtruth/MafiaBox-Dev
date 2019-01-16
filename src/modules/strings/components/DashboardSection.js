import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { showModal } from '../../modal/ModalReducer'
import { modalType } from '../../modal/types';

class DashboardSection extends React.Component {
    _onUpdate = (item) => {
        this.props.showModal(modalType.stringEdit, {
            stringKey: item.key
        })
    }

    render() {
        const { data, title, editOnly } = this.props

        if (!data.length) return null

        return (
            <div>
                <div className="-separator"/>
                <div className="dashboard-section-title">{title}</div>
                <div className="row dashboard-results">
                    {data.map((item, index) => {
                        if(editOnly) {
                            return (
                                <div
                                    key={index}
                                    highlight="true"
                                    className="dashboard-item"
                                    onClick={this._onUpdate.bind(this, item)}
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
                                app-onclick-props={JSON.stringify({
                                    tagKey: item.key
                                })}
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
        showModal,
    }
)(DashboardSection)