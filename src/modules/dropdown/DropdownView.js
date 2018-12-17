import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'

import ClickMenu from './components/ClickMenu'
import PickOperator from './components/PickOperator';
import LogicDelete from './components/LogicDelete'

import EditTag from './template/EditTag'
import CreateSomething from './template/CreateSomething'
import PickFieldType from './template/PickFieldType'
import AddTemplateField from './template/AddTemplateField'
import TemplateTitleOptions from './template/TemplateTitleOptions'

import BoardLib from './library/BoardLib';

import AddVar from './vars/AddVar'
import EditVar from './vars/EditVar'
import PickVar from './vars/PickVar'
import PickVarType from './vars/PickVarType';
import PickComparison from './vars/PickComparison'

import PickPhase from './update/PickPhase'
import PickUid from './update/PickUid'
import PickUpdate from './update/PickUpdate'
import WriteNews from './update/WriteNews'

class DropdownView extends React.Component{
    _renderItem = (dropdownKey, index) => {
        switch(dropdownKey) {
            case dropdownType.storyShowMore:
                return <ClickMenu key={index}/>
            case dropdownType.showLogic:
                return <PickOperator key={index}/>
            case dropdownType.deleteLogic:
                return <LogicDelete key={index}/>

            case dropdownType.showLibrary:
                return <BoardLib key={index}/>

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
            case dropdownType.pickVarType:
                return <PickVarType key={index}/>
            case dropdownType.pickComparison:
                return <PickComparison key={index}/>

            case dropdownType.pickPhase:
                return <PickPhase key={index}/>
            case dropdownType.pickUid:
                return <PickUid key={index}/>
            case dropdownType.pickUpdate:
                return <PickUpdate key={index}/>
            case dropdownType.writeNews:
                return <WriteNews key={index}/>
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