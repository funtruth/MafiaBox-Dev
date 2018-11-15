import React from 'react'
import { dropdownType } from '../../app/menu/types'

class AddCondition extends React.Component{
    render() {
        const { field } = this.props
        return (
            <div
                className="add-condition menu-onclick"
                menu-type={dropdownType.showLogic}
                field-key={field}
                style={{ marginBottom: 'auto' }}
            >
                <i className="ion-ios-add-circle" style={{ color: '#a6a6a6', width: 20 }}></i>
                New Field
            </div>
        )
    }
}

export default AddCondition