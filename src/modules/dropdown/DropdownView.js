import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'
import * as helpers from '../common/helpers'

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

import StoryShowMore from './story/StoryShowMore';
import InputValue from './components/InputValue'
import StoryMapLib from './library/StoryMapLib';
import PageLib from './library/PageLib';

import PickLogic from './logic/PickLogic';
import PickDeleteMode from './logic/PickDeleteMode'
import PickReturnType from './logic/PickReturnType';

import EditTag from './template/EditTag'
import AddTag from './template/AddTag'
import PickFieldType from './template/PickFieldType'
import AddTemplateField from './template/AddTemplateField'
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
import PickUpdate from './update/PickUpdate'
import ShowSubfields from './update/ShowSubfields';

import PickEvent from './strings/PickEvent';
import PickEventVar from './strings/PickEventVar'
import PickRecipient from './strings/PickRecipient'
import PickEventVarProp from './strings/PickEventVarProp';
import PickOperator from './logic/PickOperator';
import ShowLogicOptions from './logic/ShowLogicOptions';

function DropdownView(props) {
    const { update, mutate, state, updateState, dropdownKeys, statefulSource, sourceId } = props
    
    //if there is statefulSource, only show from DropdownView at sourceId
    if (statefulSource && statefulSource !== sourceId) return null 

    //hide stateful DropdownViews if no statefulSource
    if (sourceId && !statefulSource) return null

    let renderItem = (item, index) => {
        //create temporary props that are not stored in redux
        let renderProps = Object.assign({}, item)
        
        //some APIs
        renderProps.showDropdown = (key, e, params) => props.showDropdown(key, e, params, index)
        renderProps.popDropdownTo = (forcedIndex) => props.popDropdownTo(forcedIndex || index)

        //if there is a stateful update method ...
        if (updateState) {
            renderProps.updatePage = (value) => {
                updateState(
                    helpers.updateByPath(
                        renderProps.statefulPath,
                        value,
                        state,
                    )
                )
            };
            renderProps.state = state;
        } else {
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
        }
        
        switch(renderProps.key) {
            case dropdownType.pickBoolean:
            case dropdownType.pickHealth:
            case dropdownType.pickUid:
            case dropdownType.pickUpdate:
            case dropdownType.pickTimer:
            case dropdownType.pickChoice:
                renderProps.update = update
                renderProps.mutate = mutate
                break
            default:
        }
        
        //TODO proper obj
        switch(renderProps.key) {
            case dropdownType.storyShowMore:
                return <StoryShowMore {...renderProps}/>
            case dropdownType.inputValue:
                return <InputValue {...renderProps}/>
            case dropdownType.storyMapLib:
                return <StoryMapLib {...renderProps}/>
            case dropdownType.pageLib:
                return <PageLib {...renderProps}/>

            case dropdownType.dropInput:
                return <DropInput {...renderProps}/>

            case dropdownType.pickLogic:
                return <PickLogic {...renderProps}/>
            case dropdownType.pickOperator:
                return <PickOperator {...renderProps}/>
            case dropdownType.pickDeleteMode:
                return <PickDeleteMode {...renderProps}/>
            case dropdownType.pickReturnType:
                return <PickReturnType {...renderProps}/>
            case dropdownType.showLogicOptions:
                return <ShowLogicOptions {...renderProps}/>

            case dropdownType.editTag:
                return <EditTag {...renderProps}/>
            case dropdownType.addTag:
                return <AddTag {...renderProps}/>
            case dropdownType.pickFieldType:
                return <PickFieldType {...renderProps}/>
            case dropdownType.addTemplateField:
                return <AddTemplateField {...renderProps}/>
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
            case dropdownType.pickUpdate:
                return <PickUpdate {...renderProps}/>
            case dropdownType.pickPhase:
                return <SearchBoard {...renderProps} boardType={boardType.phases.key}/>
            case dropdownType.pickRole:
                return <SearchBoard {...renderProps} boardType={boardType.roles.key}/>
            case dropdownType.pickLibrary:
                return <SearchBoard {...renderProps} boardType={boardType.library.key}/>
            case dropdownType.showSubfields:
                return <ShowSubfields {...renderProps}/>

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

    return (
        dropdownKeys.map((item, index) => (
            <Dropdown {...item} key={index}>
                {renderItem(item, index)}
            </Dropdown>
        ))
    )
}

export default connect(
    state => ({
        dropdownKeys: state.dropdown.dropdownKeys,
        statefulSource: state.dropdown.statefulSource,
        update: state.template.update,
        mutate: state.template.mutate,
    }),
    {
        showDropdown,
        popDropdownTo,
        updateRepo,
        updateTopModal,
        updateFunction,
    }
)(DropdownView)