import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

import { toggleCollapse } from '../../fields/FieldReducer'

class LogicOptions extends React.Component{
    _toggleCollapse = () => {
        const { item, fieldKey, pageKey } = this.props
        this.props.toggleCollapse(item, pageKey, fieldKey)
    }

    render() {
        const { indexKey, logicInfo, fieldKey, pageKey } = this.props
        const collapsed = logicInfo.collapsed

        return (
            <div style={{ textAlign: 'center' }}>
                <i 
                    className="ion-md-close logic-option app-onclick"
                    menu-type={dropdownType.deleteLogic}
                    app-onclick-props={JSON.stringify({
                        pageKey,
                        fieldKey,
                        indexKey,
                    })}
                />
                <i 
                    className={`${collapsed ? "ion-md-expand" : "ion-md-contract"} logic-option`}
                    data-tip={collapsed ? "Expand." : "Collapse"}
                    onClick={this._toggleCollapse}
                />
            </div>
        )
    }
}

export default connect(
    null,
    {
        toggleCollapse,
    }
)(LogicOptions)