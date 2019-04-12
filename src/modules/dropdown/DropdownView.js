import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { updateSourceType } from '../common/types';
import { dropdownType } from './types'
import { boardType } from '../fields/defaults'
import { showDropdown, popDropdownTo } from './DropdownReducer'
import { updateTopModal } from '../modal/ModalReducer'
import { updateRepo } from '../page/PageReducer'
import { updateFunction } from '../functions/FunctionReducer'

import Dropdown from './components/Dropdown';
import SearchBoard from './update/SearchBoard';
import DropInput from './components/DropInput'

import AccountOptions from './account/AccountOptions'
import PickProject from './account/PickProject'

import PatchItemOptions from './board/PatchItemOptions'
import RoleItemOptions from './board/RoleItemOptions'

import PageHistory from './page/PageHistory'
import PageOptions from './page/PageOptions'

import InputValue from './components/InputValue'
import StoryMapLib from './library/StoryMapLib';
import PageLib from './library/PageLib';
import PageDetailLib from './library/PageDetailLib';

import PickLogic from './logic/PickLogic';
import PickReturnType from './logic/PickReturnType';

import EditTag from './template/EditTag'
import AddTag from './template/AddTag'
import PickFieldType from './template/PickFieldType'
import TemplateTitleOptions from './template/TemplateTitleOptions'

import AddVar from './functions/AddVar'
import DeclareVar from './functions/DeclareVar'
import EditVar from './functions/EditVar'
import EditVarName from './functions/EditVarName'
import PickVarType from './functions/PickVarType';
import WriteVarType from './functions/WriteVarType'

import PickOp from './calc/PickOp'
import PickOpType from './calc/PickOpType'
import ChangeOp from './calc/ChangeOp'
import PickAssignableVar from './calc/PickAssignableVar'
import SetOpValueTo from './calc/SetOpValueTo'

import PickVar from './vars/PickVar'
import PickVarProp from './vars/PickVarProp'
import PickUidObject from './vars/PickUidObject'
import PickComparison from './vars/PickComparison'

import PickBooleanAssign from './assign/PickBooleanAssign'
import PickUidAssign from './assign/PickUidAssign'
import DeclareVarType from './assign/DeclareVarType'

import PickBoolean from './update/PickBoolean'
import PickChoice from './update/PickChoice'
import PickHealth from './update/PickHealth'
import PickTimer from './update/PickTimer'
import PickTeam from './update/PickTeam'
import PickTrigger from './update/PickTrigger';
import PickUid from './update/PickUid'
import PickNumUpdate from './update/PickNumUpdate'
import ShowSubfields from './update/ShowSubfields';
import ShowUidSubfield from './update/ShowUidSubfield';

import PickEvent from './strings/PickEvent';
import PickEventVar from './strings/PickEventVar'
import PickRecipient from './strings/PickRecipient'
import PickEventVarProp from './strings/PickEventVarProp';
import PickOperator from './logic/PickOperator';

function DropdownView(props) {
    const { dropdownKeys } = props
    
    let renderItem = (item, index) => {
        //create temporary props that are not stored in redux
        let renderProps = Object.assign({}, item)
        
        //some APIs
        renderProps.showDropdown = (key, e, params) => props.showDropdown(key, e, params, index)
        renderProps.popDropdownTo = (forcedIndex) => props.popDropdownTo(forcedIndex || index)

        switch(renderProps.updateSource) {
            case updateSourceType.repo:
                renderProps.updatePage = (value) => {
                    if (renderProps.ignoreSubpath) {
                        props.updateRepo(renderProps.path, value)
                    } else {
                        props.updateRepo(renderProps.path, value, renderProps.subpath)
                    }
                }
                break
            case updateSourceType.function:
                renderProps.updatePage = (value) => {
                    if (renderProps.ignoreSubpath) {
                        props.updateFunction(renderProps.path, value)
                    } else {
                        props.updateFunction(renderProps.path, value, renderProps.subpath)
                    }
                }
                break
            case updateSourceType.topModal:
                renderProps.updatePage = (value) => {
                    props.updateTopModal(renderProps.path, value, renderProps.subpath)
                }
                break
            default:
                renderProps.updatePage = () => console.warn('updatePage is not set up for this Dropdown.')
        }
        
        switch(renderProps.key) {
            case dropdownType.accountOptions:
                return <AccountOptions {...renderProps}/>
            case dropdownType.pickProject:
                return <PickProject {...renderProps}/>

            case dropdownType.patchItemOptions:
                return <PatchItemOptions {...renderProps}/>
            case dropdownType.roleItemOptions:
                return <RoleItemOptions {...renderProps}/>

            case dropdownType.pageHistory:
                return <PageHistory {...renderProps}/>
            case dropdownType.pageOptions:
                return <PageOptions {...renderProps}/>

            case dropdownType.inputValue:
                return <InputValue {...renderProps}/>
            case dropdownType.storyMapLib:
                return <StoryMapLib {...renderProps}/>
            case dropdownType.pageLib:
                return <PageLib {...renderProps}/>
            case dropdownType.pageDetailLib:
                return <PageDetailLib {...renderProps}/>

            case dropdownType.dropInput:
                return <DropInput {...renderProps}/>

            case dropdownType.pickLogic:
                return <PickLogic {...renderProps}/>
            case dropdownType.pickOperator:
                return <PickOperator {...renderProps}/>
            case dropdownType.pickReturnType:
                return <PickReturnType {...renderProps}/>

            case dropdownType.editTag:
                return <EditTag {...renderProps}/>
            case dropdownType.addTag:
                return <AddTag {...renderProps}/>
            case dropdownType.pickFieldType:
                return <PickFieldType {...renderProps}/>
            case dropdownType.templateTitleOptions:
                return <TemplateTitleOptions {...renderProps}/>
                
            case dropdownType.addVar:
                return <AddVar {...renderProps}/>
            case dropdownType.declareVar:
                return <DeclareVar {...renderProps}/>
            case dropdownType.editVar:
                return <EditVar {...renderProps}/>
            case dropdownType.editVarName:
                return <EditVarName {...renderProps}/>
            case dropdownType.pickVar:
                return <PickVar {...renderProps}/>
            case dropdownType.pickVarProp:
                return <PickVarProp {...renderProps}/>
            case dropdownType.pickUidObject:
                return <PickUidObject {...renderProps}/>
            case dropdownType.pickVarType:
                return <PickVarType {...renderProps}/>
            case dropdownType.pickComparison:
                return <PickComparison {...renderProps}/>
            case dropdownType.writeVarType:
                return <WriteVarType {...renderProps}/>
                
            case dropdownType.pickBooleanAssign:
                return <PickBooleanAssign {...renderProps}/>
            case dropdownType.pickUidAssign:
                return <PickUidAssign {...renderProps}/>
            case dropdownType.declareVarType:
                return <DeclareVarType {...renderProps}/>

            case dropdownType.pickOp:
                return <PickOp {...renderProps}/>
            case dropdownType.pickOpType:
                return <PickOpType {...renderProps}/>
            case dropdownType.changeOp:
                return <ChangeOp {...renderProps}/>
            case dropdownType.pickAssignableVar:
                return <PickAssignableVar {...renderProps}/>
            case dropdownType.setOpValueTo:
                return <SetOpValueTo {...renderProps}/>

            case dropdownType.pickBoolean: 
                return <PickBoolean {...renderProps}/>
            case dropdownType.pickChoice:
                return <PickChoice {...renderProps}/>
            case dropdownType.pickHealth:
                return <PickHealth {...renderProps}/>
            case dropdownType.pickTimer:
                return <PickTimer {...renderProps}/>
            case dropdownType.pickTeam:
                return <PickTeam {...renderProps}/>
            case dropdownType.pickTrigger:
                return <PickTrigger {...renderProps}/>
            case dropdownType.pickUid:
                return <PickUid {...renderProps}/>
            case dropdownType.pickNumUpdate:
                return <PickNumUpdate {...renderProps}/>
            case dropdownType.pickPhase:
                return <SearchBoard {...renderProps} boardType={boardType.phases.key}/>
            case dropdownType.pickRole:
                return <SearchBoard {...renderProps} boardType={boardType.roles.key}/>
            case dropdownType.pickLibrary:
                return <SearchBoard {...renderProps} boardType={boardType.library.key}/>
            case dropdownType.showSubfields:
                return <ShowSubfields {...renderProps}/>
            case dropdownType.showUidSubfield:
                return <ShowUidSubfield {...renderProps}/>

            case dropdownType.pickEvent:
                return <PickEvent {...renderProps}/>
            case dropdownType.pickEventVar:
                return <PickEventVar {...renderProps}/>
            case dropdownType.pickEventVarProp:
                return <PickEventVarProp {...renderProps}/>
            case dropdownType.pickRecipient:
                return <PickRecipient {...renderProps}/>
            default:
                return null
        }
    }

    if (dropdownKeys.length === 0) return null

    //covers the whole screen
    return (
        <div className="drop-down-pause">
            {dropdownKeys.map((item, index) => (
                <Dropdown {...item} key={index} index={index}>
                    {renderItem(item, index)}
                </Dropdown>
            ))}
        </div>
    )
}

export default connect(
    state => ({
        dropdownKeys: state.dropdown.dropdownKeys,
    }),
    {
        showDropdown,
        popDropdownTo,
        updateRepo,
        updateTopModal,
        updateFunction,
    }
)(DropdownView)