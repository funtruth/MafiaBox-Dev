import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'

import ClickMenu from './components/ClickMenu'
import OtherValues from './components/OtherValues'
import PhaseMenu from './components/PhaseMenu';
import DeepPhaseMenu from './components/DeepPhaseMenu'

class DropdownView extends React.Component{
    _renderItem = (dropdownKey, index) => {
        switch(dropdownKey) {
            case dropdownType.storyShowMore:
                return <ClickMenu key={index}/>
            case dropdownType.showOtherOptions:
                return <OtherValues key={index}/>
            case dropdownType.showAllPhases:
                return <PhaseMenu key={index}/>
            case dropdownType.showMorePhases:
                return <DeepPhaseMenu key={index}/>
            default:
                return null
        }
    }

    render() {
        const { dropdownKeys } = this.props
        if (dropdownKeys.length === 0) return null
        return (
            <div>
                {dropdownKeys.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownKeys: state.dropdown.dropdownKeys,
    })
)(DropdownView)