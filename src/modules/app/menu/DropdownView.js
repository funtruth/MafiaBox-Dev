import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from './DropdownReducer'

import { dropdownType } from './types'

import ClickMenu from './ClickMenu'

class DropdownView extends React.Component{
    render() {
        const { dropdownKey } = this.props
        if (!dropdownKey) return null

        switch(dropdownKey) {
            case dropdownType.storyShowMore:
                return <ClickMenu/>
            default:
                return null
        }
    }
}

export default connect(
    state => ({
        dropdownKey: state.dropdown.dropdownKey,
    }),
    {
        showDropdownByKey,
    }
)(DropdownView)