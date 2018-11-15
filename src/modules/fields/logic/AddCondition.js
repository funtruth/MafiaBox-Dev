import React from 'react'
import { dropdownType } from '../../app/menu/types'

class AddCondition extends React.Component{
    render() {
        const { pageInfo, data } = this.props
        if (!data) return null
        
        const { value } = this.props

        if (value && value[value.length - 1])
        return (
            <div
                key={to}
                field-key="phaseTriggerMode"
                page-key={pageInfo.pageKey}
                subfield-key="to"
                index-key={index}
                className="property-button menu-onclick"
                menu-type={dropdownType.showAllPhases}
            >
                <i className="ion-ios-add-circle" style={{ color: '#a6a6a6', width: 20 }}></i>
                {(pageKey && pageRepo[pageKey].title) || 'None'}
            </div>
        )
    }
}

const style = {

}

export default AddCondition