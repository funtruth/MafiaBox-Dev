import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'

import ClickMenu from './components/ClickMenu'
import OtherValues from './components/OtherValues'

class DropdownView extends React.Component{
    render() {
        const { dropdownKey } = this.props
        if (!dropdownKey) return null

        switch(dropdownKey) {
            case dropdownType.storyShowMore:
                return <ClickMenu/>
            case dropdownType.showOtherOptions:
                return <OtherValues/>
            default:
                return null
        }
    }
}

export default connect(
    state => ({
        dropdownKey: state.dropdown.dropdownKey,
    })
)(DropdownView)