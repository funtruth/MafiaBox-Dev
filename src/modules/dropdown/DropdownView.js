import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'

import ClickMenu from './components/ClickMenu'
import OtherValues from './components/OtherValues'
import LogicMenu from './components/LogicMenu';
import LogicDelete from './components/LogicDelete'

import EditTag from './template/EditTag'
import CreateSomething from './template/CreateSomething'
import PickFieldType from './template/PickFieldType'

import LibraryMenu from './library/LibraryMenu';
import DeepLibraryMenu from './library/DeepLibraryMenu'
import DeepestLibraryMenu from './library/DeepestLibraryMenu';

class DropdownView extends React.Component{
    _renderItem = (dropdownKey, index) => {
        switch(dropdownKey) {
            case dropdownType.storyShowMore:
                return <ClickMenu key={index}/>
            case dropdownType.showOtherOptions:
                return <OtherValues key={index}/>
            case dropdownType.showLibrary:
                return <LibraryMenu key={index}/>
            case dropdownType.showDeepLibrary:
                return <DeepLibraryMenu key={index}/>
            case dropdownType.showDeepestLibrary:
                return <DeepestLibraryMenu key={index}/>
            case dropdownType.showLogic:
                return <LogicMenu key={index}/>
            case dropdownType.deleteLogic:
                return <LogicDelete key={index}/>
            case dropdownType.editTag:
                return <EditTag key={index}/>
            case dropdownType.createSomething:
                return <CreateSomething key={index}/>
            case dropdownType.pickFieldType:
                return <PickFieldType key={index}/>
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