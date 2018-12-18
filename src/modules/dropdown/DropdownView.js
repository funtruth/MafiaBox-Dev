import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'

import ClickMenu from './components/ClickMenu'

import PickOperator from './logic/PickOperator';
import LogicDelete from './logic/LogicDelete'

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
import Dropdown from './components/Dropdown';

class DropdownView extends React.Component{
    _renderItem = (props) => {
        switch(props.key) {
            case dropdownType.storyShowMore:
                return <ClickMenu {...props}/>
                
            case dropdownType.showLogic:
                return <PickOperator {...props}/>
            case dropdownType.deleteLogic:
                return <LogicDelete {...props}/>

            case dropdownType.showLibrary:
                return <BoardLib {...props}/>

            case dropdownType.editTag:
                return <EditTag {...props}/>
            case dropdownType.createSomething:
                return <CreateSomething {...props}/>
            case dropdownType.pickFieldType:
                return <PickFieldType {...props}/>
            case dropdownType.addTemplateField:
                return <AddTemplateField {...props}/>
            case dropdownType.templateTitleOptions:
                return <TemplateTitleOptions {...props}/>
                
            case dropdownType.addVar:
                return <AddVar {...props}/>
            case dropdownType.editVar:
                return <EditVar {...props}/>
            case dropdownType.pickVar:
                return <PickVar {...props}/>
            case dropdownType.pickVarType:
                return <PickVarType {...props}/>
            case dropdownType.pickComparison:
                return <PickComparison {...props}/>

            case dropdownType.pickPhase:
                return <PickPhase {...props}/>
            case dropdownType.pickUid:
                return <PickUid {...props}/>
            case dropdownType.pickUpdate:
                return <PickUpdate {...props}/>
            case dropdownType.writeNews:
                return <WriteNews {...props}/>
            default:
                return null
        }
    }

    render() {
        const { dropdownKeys } = this.props
        if (!dropdownKeys || dropdownKeys.length === 0) return null
        return (
            dropdownKeys.map(item => {
                return (
                    <Dropdown {...item}>
                        {this._renderItem(item)}
                    </Dropdown>
                )}
            )
        )
    }
}

export default connect(
    state => ({
        dropdownKeys: state.dropdown.dropdownKeys,
    })
)(DropdownView)