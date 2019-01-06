import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'
import { boardType } from '../board/types'

import ClickMenu from './components/ClickMenu'
import InputValue from './components/InputValue'

import PickOperator from './logic/PickOperator';
import LogicDelete from './logic/LogicDelete'

import EditTag from './template/EditTag'
import AddTag from './template/AddTag'
import PickFieldType from './template/PickFieldType'
import AddTemplateField from './template/AddTemplateField'
import TemplateTitleOptions from './template/TemplateTitleOptions'

import BoardLib from './library/BoardLib';
import PageLib from './library/PageLib';
import StoryMapLib from './library/StoryMapLib';

import AddVar from './vars/AddVar'
import EditVar from './vars/EditVar'
import PickVar from './vars/PickVar'
import PickVarType from './vars/PickVarType';
import PickComparison from './vars/PickComparison'

import PickBoolean from './update/PickBoolean'
import PickUid from './update/PickUid'
import PickUpdate from './update/PickUpdate'
import AddUpdateField from './update/AddUpdateField'
import PickNews from './update/PickNews'
import Dropdown from './components/Dropdown';
import SearchBoard from './update/SearchBoard';

class DropdownView extends React.Component{
    _renderItem = (props) => {
        switch(props.key) {
            case dropdownType.storyShowMore:
                return <ClickMenu {...props}/>
            case dropdownType.inputValue:
                return <InputValue {...props}/>
                
            case dropdownType.showLogic:
                return <PickOperator {...props}/>
            case dropdownType.deleteLogic:
                return <LogicDelete {...props}/>

            case dropdownType.showLibrary:
                return <BoardLib {...props}/>
            case dropdownType.pageLib:
                return <PageLib {...props}/>
            case dropdownType.storyMapLib:
                return <StoryMapLib {...props}/>

            case dropdownType.editTag:
                return <EditTag {...props}/>
            case dropdownType.addTag:
                return <AddTag {...props}/>
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
                return <SearchBoard {...props} boardType={boardType.flow}/>
            case dropdownType.pickRole:
                return <SearchBoard {...props} boardType={boardType.roles}/>
            case dropdownType.pickUid:
                return <PickUid {...props}/>
            case dropdownType.pickUpdate:
                return <PickUpdate {...props}/>
            case dropdownType.pickBoolean: 
                return <PickBoolean {...props}/>
            case dropdownType.addUpdateField:
                return <AddUpdateField {...props}/>
            case dropdownType.writeNews:
                return <PickNews {...props}/>
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