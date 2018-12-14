import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'

import ClickMenu from './components/ClickMenu'
import LogicMenu from './components/LogicMenu'
import LogicDelete from './components/LogicDelete'
import PickOperator from './components/PickOperator'

import EditTag from './template/EditTag'
import CreateSomething from './template/CreateSomething'
import PickFieldType from './template/PickFieldType'
import AddTemplateField from './template/AddTemplateField'
import TemplateTitleOptions from './template/TemplateTitleOptions'

import LibraryMenu from './library/LibraryMenu'
import DeepLibraryMenu from './library/DeepLibraryMenu'
import DeepestLibraryMenu from './library/DeepestLibraryMenu'

import AddVar from './vars/AddVar'
import EditVar from './vars/EditVar'
import PickVar from './vars/PickVar'
import PickComparison from './vars/PickComparison'

class DropdownView extends React.Component{
    _renderItem = (dropdownKey, index) => {
        switch(dropdownKey) {
            case dropdownType.storyShowMore:
                return <ClickMenu key={index}/>
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
            case dropdownType.pickOperator:
                return <PickOperator key={index}/>
            case dropdownType.editTag:
                return <EditTag key={index}/>
            case dropdownType.createSomething:
                return <CreateSomething key={index}/>
            case dropdownType.pickFieldType:
                return <PickFieldType key={index}/>
            case dropdownType.addTemplateField:
                return <AddTemplateField key={index}/>
            case dropdownType.templateTitleOptions:
                return <TemplateTitleOptions key={index}/>
            case dropdownType.addVar:
                return <AddVar key={index}/>
            case dropdownType.editVar:
                return <EditVar key={index}/>
            case dropdownType.pickVar:
                return <PickVar key={index}/>
            case dropdownType.pickComparison:
                return <PickComparison key={index}/>
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