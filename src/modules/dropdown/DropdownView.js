import React from 'react'
import './dropdown.css'
import { connect } from 'react-redux'

import { dropdownType } from './types'
import { boardType } from '../fields/defaults'
import { showDropdown, popDropdownTo } from './DropdownReducer'
import { updateTopModal } from '../modal/ModalReducer'
import { updateRepo } from '../page/PageReducer'
import { updateFunction } from '../functions/FunctionReducer'

import Dropdown from './components/Dropdown';
import SearchBoard from './update/SearchBoard';

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

import PickBasicOp from './calc/PickBasicOp'
import PickOpType from './calc/PickOpType'

import PickVar from './vars/PickVar'
import PickVarProp from './vars/PickVarProp'
import PickUidObject from './vars/PickUidObject'
import PickComparison from './vars/PickComparison'

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

class DropdownView extends React.Component{
    _renderItem = (item, index) => {
        const { update, mutate } = this.props
        let props = Object.assign({}, item)
        
        props.showDropdown = (key, e, params) => this.props.showDropdown(key, e, params, index)
        props.popDropdownTo = (forcedIndex) => this.props.popDropdownTo(forcedIndex || index)

        switch(props.key) {
            case dropdownType.pickUid:
            case dropdownType.pickChoice:
            case dropdownType.pickUpdate:
            case dropdownType.pickBoolean:
            case dropdownType.pickHealth:
            case dropdownType.pickTimer:
            case dropdownType.pageLib:
            case dropdownType.pickVar:
            case dropdownType.pickVarType:
            case dropdownType.pickVarProp:
            case dropdownType.pickComparison:
            case dropdownType.inputValue:
                if (props.isTrigger) {
                    props.updatePage = (value) => this.props.updateTopModal(
                        ['attach', 'value', props.subfieldKey],
                        value,
                    )
                } else {
                    props.updatePage = (value) => this.props.updateRepo(
                        [props.pageKey, props.fieldKey, props.indexKey, 'data', props.subfieldKey],
                        value,
                    )
                }
                break
            case dropdownType.pickRecipient:
            case dropdownType.pickEventVar:
            case dropdownType.pickEventVarProp:
                if (props.selectedKey) {
                    props.updatePage = (value) => this.props.updateTopModal(
                        ['attach', 'value', props.selectedKey],
                        value,
                    )
                } else {
                    props.updatePage = (value) => this.props.updateTopModal(
                        ['attach'],
                        value,
                    )
                }
                break
            case dropdownType.pickReturnType:
            case dropdownType.boardLib:
            case dropdownType.pickUidObject:
            case dropdownType.assignVar:
            case dropdownType.declareVar:
                props.updatePage = (value) => this.props.updateRepo(
                    [props.pageKey, props.fieldKey, props.indexKey, 'data'],
                    value,
                )
                break
            case dropdownType.pickLogic:
            case dropdownType.pickOperator:
                props.updatePage = (value) => this.props.updateRepo(
                    [props.pageKey, props.fieldKey, props.indexKey],
                    value,
                )
                break
            case dropdownType.writeVarType:
                props.updatePage = (value) => this.props.updateFunction(
                    [props.pageKey, props.fieldKey, props.tagKey],
                    value,
                )
                break
            case dropdownType.addVar:
                props.updatePage = (tagKey, value) => this.props.updateFunction(
                    [props.pageKey, props.fieldKey, tagKey],
                    value,
                )
                break
            case dropdownType.pickOpType:
                props.updatePage = (value) => this.props.updateTopModal(
                    ['attach', 'assign'],
                    value,
                )
                break
            default:
                props.updatePage = () => console.warn('updatePage is not set up for this Dropdown.')
        }

        switch(props.key) {
            case dropdownType.pickBoolean:
            case dropdownType.pickHealth:
            case dropdownType.pickUid:
            case dropdownType.pickUpdate:
            case dropdownType.pickTimer:
            case dropdownType.pickChoice:
                props.update = update
                props.mutate = mutate
                break
            default:
        }
        
        //TODO proper obj
        switch(props.key) {
            case dropdownType.storyShowMore:
                return <StoryShowMore {...props}/>
            case dropdownType.inputValue:
                return <InputValue {...props}/>
            case dropdownType.storyMapLib:
                return <StoryMapLib {...props}/>
            case dropdownType.pageLib:
                return <PageLib {...props}/>

            case dropdownType.pickLogic:
                return <PickLogic {...props}/>
            case dropdownType.pickOperator:
                return <PickOperator {...props}/>
            case dropdownType.pickDeleteMode:
                return <PickDeleteMode {...props}/>
            case dropdownType.pickReturnType:
                return <PickReturnType {...props}/>

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
            case dropdownType.declareVar:
                return <DeclareVar {...props}/>
            case dropdownType.editVar:
                return <EditVar {...props}/>
            case dropdownType.editVarName:
                return <EditVarName {...props}/>
            case dropdownType.pickVar:
                return <PickVar {...props}/>
            case dropdownType.pickVarProp:
                return <PickVarProp {...props}/>
            case dropdownType.pickUidObject:
                return <PickUidObject {...props}/>
            case dropdownType.pickVarType:
                return <PickVarType {...props}/>
            case dropdownType.pickComparison:
                return <PickComparison {...props}/>
            case dropdownType.writeVarType:
                return <WriteVarType {...props}/>

            case dropdownType.pickBasicOp:
                return <PickBasicOp {...props}/>
            case dropdownType.pickOpType:
                return <PickOpType {...props}/>

            case dropdownType.pickBoolean: 
                return <PickBoolean {...props}/>
            case dropdownType.pickChoice:
                return <PickChoice {...props}/>
            case dropdownType.pickHealth:
                return <PickHealth {...props}/>
            case dropdownType.pickTimer:
                return <PickTimer {...props}/>
            case dropdownType.pickTeam:
                return <PickTeam {...props}/>
            case dropdownType.pickTrigger:
                return <PickTrigger {...props}/>
            case dropdownType.pickUid:
                return <PickUid {...props}/>
            case dropdownType.pickUpdate:
                return <PickUpdate {...props}/>
            case dropdownType.pickPhase:
                return <SearchBoard {...props} boardType={boardType.phases.key}/>
            case dropdownType.pickRole:
                return <SearchBoard {...props} boardType={boardType.roles.key}/>
            case dropdownType.pickLibrary:
                return <SearchBoard {...props} boardType={boardType.library.key}/>
            case dropdownType.showSubfields:
                return <ShowSubfields {...props}/>

            case dropdownType.pickEvent:
                return <PickEvent {...props}/>
            case dropdownType.pickEventVar:
                return <PickEventVar {...props}/>
            case dropdownType.pickEventVarProp:
                return <PickEventVarProp {...props}/>
            case dropdownType.pickRecipient:
                return <PickRecipient {...props}/>
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