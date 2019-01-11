import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'
import { boardType } from '../board/types'
import { showDropdown, popDropdownTo } from './DropdownReducer'

import Dropdown from './components/Dropdown';
import SearchBoard from './update/SearchBoard';

import ClickMenu from './components/ClickMenu'
import InputValue from './components/InputValue'

import PickOperator from './logic/PickOperator';
import LogicDelete from './logic/LogicDelete'
import ReturnTypes from './logic/ReturnTypes';

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
import PickVarProp from './vars/PickVarProp'
import PickVarType from './vars/PickVarType';
import PickComparison from './vars/PickComparison'

import PickBoolean from './update/PickBoolean'
import PickUid from './update/PickUid'
import PickUpdate from './update/PickUpdate'
import AddUpdateField from './update/AddUpdateField'
import PickNews from './update/PickNews'
import PickHealth from './update/PickHealth'
import PickTrigger from './update/PickTrigger';

class DropdownView extends React.Component{
    _renderItem = (props, index) => {
        props.showDropdown = (key, e, params) => this.props.showDropdown(key, e, params, index)
        props.popDropdownTo = (forcedIndex) => this.props.popDropdownTo(forcedIndex || index)

        switch(props.key) {
            case dropdownType.storyShowMore:
                return <ClickMenu {...props}/>
            case dropdownType.inputValue:
                return <InputValue {...props}/>
                
            case dropdownType.showLogic:
                return <PickOperator {...props}/>
            case dropdownType.deleteLogic:
                return <LogicDelete {...props}/>
            case dropdownType.returnTypes:
                return <ReturnTypes {...props}/>

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
            case dropdownType.pickVarProp:
                return <PickVarProp {...props}/>
            case dropdownType.pickVarType:
                return <PickVarType {...props}/>
            case dropdownType.pickComparison:
                return <PickComparison {...props}/>

            //these write directly
            case dropdownType.pickPhase:
                return <SearchBoard {...props} boardType={boardType.phases}/>
            case dropdownType.pickRole:
                return <SearchBoard {...props} boardType={boardType.roles}/>
            case dropdownType.pickLibrary:
                return <SearchBoard {...props} boardType={boardType.library}/>
            case dropdownType.pickUid:
                return <PickUid {...props}/>
            case dropdownType.pickUpdate:
                return <PickUpdate {...props}/>
            case dropdownType.pickBoolean: 
                return <PickBoolean {...props}/>
            case dropdownType.pickHealth:
                return <PickHealth {...props}/>

            case dropdownType.addUpdateField:
                return <AddUpdateField {...props}/>
            case dropdownType.writeNews:
                return <PickNews {...props}/>
            case dropdownType.pickTrigger:
                return <PickTrigger {...props}/>
            default:
                return null
        }
    }

    render() {
        const { dropdownKeys } = this.props
        if (!dropdownKeys.length) return null
        
        return (
            dropdownKeys.map((item, index) => {
                return (
                    <Dropdown {...item} key={index}>
                        {this._renderItem(item, index)}
                    </Dropdown>
                )}
            )
        )
    }
}

export default connect(
    state => ({
        dropdownKeys: state.dropdown.dropdownKeys,
    }),
    {
        showDropdown,
        popDropdownTo,
    }
)(DropdownView)