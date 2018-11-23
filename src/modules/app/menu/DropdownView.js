import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'

import ClickMenu from './components/ClickMenu'
import OtherValues from './components/OtherValues'
import LibraryMenu from './components/LibraryMenu';
import DeepLibraryMenu from './components/DeepLibraryMenu'
import LogicMenu from './components/LogicMenu';
import LogicDelete from './components/LogicDelete'

class DropdownView extends React.Component{
    _renderItem = (dropdownKey, index) => {
        switch(dropdownKey) {
            case dropdownType.storyShowMore:
                return <ClickMenu key={index}/>
            case dropdownType.showOtherOptions:
                return <OtherValues key={index}/>
            case dropdownType.showAllPhases:
                return <LibraryMenu key={index}/>
            case dropdownType.showMorePhases:
                return <DeepLibraryMenu key={index}/>
            case dropdownType.showLogic:
                return <LogicMenu key={index}/>
            case dropdownType.deleteLogic:
                return <LogicDelete key={index}/>
            default:
                return null
        }
    }

    render() {
        const { dropdownKeys } = this.props
        if (!dropdownKeys || dropdownKeys.length === 0) return null
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