import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from './DropdownReducer'

import ClickMenu from './ClickMenu'

class DropdownView extends React.Component{
    render() {
        const { dropdownKey } = this.props
        if (!dropdownKey) return null

        return (
            <div>
                <ClickMenu/>
            </div>
        )
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