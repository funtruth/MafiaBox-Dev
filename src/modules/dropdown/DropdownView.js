import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { updateSourceType } from '../common/types';
import { dropdownType } from './types'
import { boardType } from '../fields/defaults'

import { showDropdown, popDropdownTo } from './DropdownReducer'
import { updateTopModal, showModal } from '../modal/ModalReducer'
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
import CreateUniqueTag from './page/CreateUniqueTag'
import EditUniqueTag from './page/EditUniqueTag'
import CreateGeneralTag from './page/CreateGeneralTag'
import EditGeneralTag from './page/EditGeneralTag'
import CreateGameChoice from './page/CreateGameChoice'
import PickGameChoiceType from './page/PickGameChoiceType'
import WriteGameChoice from './page/WriteGameChoice'
import CreateGlobalVar from './page/CreateGlobalVar'

import PickFieldType from './template/PickFieldType'
import TemplateTitleOptions from './template/TemplateTitleOptions'

import AddVar from './functions/AddVar'
import DeclareOrAssignVar from './functions/DeclareOrAssignVar'
import EditVar from './functions/EditVar'
import EditVarName from './functions/EditVarName'
import PickVarType from './functions/PickVarType';
import WriteVarType from './functions/WriteVarType'

import PickOpType from './calc/PickOpType'

import PickVar from './vars/PickVar'
import PickVarSubfield from './vars/PickVarSubfield'
import PickUidObject from './vars/PickUidObject'
import PickComparison from './vars/PickComparison'
import ReplaceWildcard from './vars/ReplaceWildcard'
import PickGlobalVar from './vars/PickGlobalVar'

import PickBooleanAssign from './assign/PickBooleanAssign'
import PickUidAssign from './assign/PickUidAssign'
import DeclareVarType from './assign/DeclareVarType'

import PickBoolean from './update/PickBoolean'
import PickChoice from './update/PickChoice'
import PickHealth from './update/PickHealth'
import PickTimer from './update/PickTimer'
import PickTrigger from './update/PickTrigger';
import PickUid from './update/PickUid'
import PickNumUpdate from './update/PickNumUpdate'
import ShowSubfields from './update/ShowSubfields';
import ShowUidSubfield from './update/ShowUidSubfield';
import ShowRoleSubfields from './update/ShowRoleSubfields'
import PickRoleTeam from './update/PickRoleTeam';

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
        renderProps.showDropdown = (key, e, params) => props.showDropdown(key, e, params, index, 'right')
        renderProps.popDropdownTo = (forcedIndex) => props.popDropdownTo(forcedIndex || index)
        renderProps.popDropdown = () => props.popDropdownTo(index - 1)
        renderProps.showModal = props.showModal

        switch(renderProps.updateSource) {
            case updateSourceType.repo:
                renderProps.updatePage = (value, extraPath=[]) => {
                    if (renderProps.ignoreSubpath) {
                        props.updateRepo(renderProps.path, value, extraPath)
                    } else {
                        props.updateRepo(renderProps.path, value, (renderProps.subpath||[]).concat(extraPath))
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
            case dropdownType.createUniqueTag:
                return <CreateUniqueTag {...renderProps}/>
            case dropdownType.editUniqueTag:
                return <EditUniqueTag {...renderProps}/>
            case dropdownType.createGeneralTag:
                return <CreateGeneralTag {...renderProps}/>
            case dropdownType.editGeneralTag:
                return <EditGeneralTag {...renderProps}/>
            case dropdownType.createGameChoice:
                return <CreateGameChoice {...renderProps}/>
            case dropdownType.pickGameChoiceType:
                return <PickGameChoiceType {...renderProps}/>
            case dropdownType.writeGameChoice:
                return <WriteGameChoice {...renderProps}/>
            case dropdownType.pickFieldType:
                return <PickFieldType {...renderProps}/>
            case dropdownType.templateTitleOptions:
                return <TemplateTitleOptions {...renderProps}/>
            case dropdownType.createGlobalVar:
                return <CreateGlobalVar {...renderProps}/>
                
            case dropdownType.addVar:
                return <AddVar {...renderProps}/>
            case dropdownType.declareOrAssignVar:
                return <DeclareOrAssignVar {...renderProps}/>
            case dropdownType.editVar:
                return <EditVar {...renderProps}/>
            case dropdownType.editVarName:
                return <EditVarName {...renderProps}/>
            case dropdownType.pickVar:
                return <PickVar {...renderProps}/>
            case dropdownType.pickVarSubfield:
                return <PickVarSubfield {...renderProps}/>
            case dropdownType.pickUidObject:
                return <PickUidObject {...renderProps}/>
            case dropdownType.pickVarType:
                return <PickVarType {...renderProps}/>
            case dropdownType.pickComparison:
                return <PickComparison {...renderProps}/>
            case dropdownType.writeVarType:
                return <WriteVarType {...renderProps}/>
            case dropdownType.replaceWildcard:
                return <ReplaceWildcard {...renderProps}/>
                
            case dropdownType.pickBooleanAssign:
                return <PickBooleanAssign {...renderProps}/>
            case dropdownType.pickUidAssign:
                return <PickUidAssign {...renderProps}/>
            case dropdownType.declareVarType:
                return <DeclareVarType {...renderProps}/>

            case dropdownType.pickOpType:
                return <PickOpType {...renderProps}/>

            case dropdownType.pickBoolean: 
                return <PickBoolean {...renderProps}/>
            case dropdownType.pickChoice:
                return <PickChoice {...renderProps}/>
            case dropdownType.pickHealth:
                return <PickHealth {...renderProps}/>
            case dropdownType.pickTimer:
                return <PickTimer {...renderProps}/>
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
            case dropdownType.showRoleSubfields:
                return <ShowRoleSubfields {...renderProps}/>
            case dropdownType.pickRoleTeam:
                return <PickRoleTeam {...renderProps}/>
            case dropdownType.pickGlobalVar:    
                return <PickGlobalVar {...renderProps}/>

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
                <Dropdown
                    {...item}
                    key={item.key + index + JSON.stringify(item.serialList)}
                    index={index}
                    onClick={() => props.popDropdownTo(index)}
                >
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
        showModal,
        updateRepo,
        updateTopModal,
        updateFunction,
    }
)(DropdownView)