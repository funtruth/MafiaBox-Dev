import React from 'react'

import {
    boardType,
    dropdownType,
} from '../common/types';

import SearchBoard from './update/SearchBoard';
import DropInput from './components/DropInput'

import DropString from './common/DropString';
import AccountOptions from './account/AccountOptions'
import PickProject from './account/PickProject'

import EditPlayerNum from './board/EditPlayerNum'
import PatchItemOptions from './board/PatchItemOptions'
import RoleItemOptions from './board/RoleItemOptions'

import PageHistory from './page/PageHistory'
import PageOptions from './page/PageOptions'

import InputValue from './components/InputValue'
import PageLib from './library/PageLib';

import PickLogic from './logic/PickLogic';
import PickOperator from './logic/PickOperator';

import CreateTag from './page/CreateTag'
import EditUniqueTag from './page/EditUniqueTag'
import EditGeneralTag from './page/EditGeneralTag'
import CreateGameChoice from './page/CreateGameChoice'
import PickGameChoiceType from './page/PickGameChoiceType'
import WriteGameChoice from './page/WriteGameChoice'
import CreateGlobalVar from './page/CreateGlobalVar'

import PickVar from './vars/PickVar'
import PickVarSubfield from './vars/PickVarSubfield'
import PickVarWithType from './vars/PickVarWithType';
import PickComparison from './vars/PickComparison'
import ReplaceWildcard from './vars/ReplaceWildcard'
import PickGlobalVar from './vars/PickGlobalVar'
import VarItemConstant from './common/VarItemConstant'
import DeclareVarType from './vars/DeclareVarType'
import DeclareVarName from './vars/DeclareVarName'
import DeclarePanelVar from './vars/DeclarePanelVar'

import PickChoice from './update/PickChoice'
import PickHealth from './update/PickHealth'
import PickTrigger from './update/PickTrigger';
import PickUid from './update/PickUid'
import PickRoleTeam from './update/PickRoleTeam';
import PickGlobalValue from './update/PickGlobalValue';
import PickRecipient from './strings/PickRecipient'

//NumberViews
import PickNumValue from './vars/PickNumValue';

export default function DropdownKeys(props) {
    switch(props.key) {
        case dropdownType.dropString:
            return <DropString {...props}/>
        case dropdownType.accountOptions:
            return <AccountOptions {...props}/>
        case dropdownType.pickProject:
            return <PickProject {...props}/>

        case dropdownType.editPlayerNum:
            return <EditPlayerNum {...props}/>
        case dropdownType.patchItemOptions:
            return <PatchItemOptions {...props}/>
        case dropdownType.roleItemOptions:
            return <RoleItemOptions {...props}/>

        case dropdownType.pageHistory:
            return <PageHistory {...props}/>
        case dropdownType.pageOptions:
            return <PageOptions {...props}/>

        case dropdownType.inputValue:
            return <InputValue {...props}/>
        case dropdownType.pageLib:
            return <PageLib {...props}/>

        case dropdownType.dropInput:
            return <DropInput {...props}/>

        case dropdownType.pickLogic:
            return <PickLogic {...props}/>
        case dropdownType.pickOperator:
            return <PickOperator {...props}/>

        case dropdownType.createTag:
            return <CreateTag {...props}/>
        case dropdownType.editUniqueTag:
            return <EditUniqueTag {...props}/>
        case dropdownType.editGeneralTag:
            return <EditGeneralTag {...props}/>
        case dropdownType.createGameChoice:
            return <CreateGameChoice {...props}/>
        case dropdownType.pickGameChoiceType:
            return <PickGameChoiceType {...props}/>
        case dropdownType.writeGameChoice:
            return <WriteGameChoice {...props}/>
        case dropdownType.createGlobalVar:
            return <CreateGlobalVar {...props}/>
        
        case dropdownType.pickVar:
            return <PickVar {...props}/>
        case dropdownType.pickVarSubfield:
            return <PickVarSubfield {...props}/>
        case dropdownType.pickVarWithType:
            return <PickVarWithType {...props}/>
        case dropdownType.pickComparison:
            return <PickComparison {...props}/>
        case dropdownType.replaceWildcard:
            return <ReplaceWildcard {...props}/>
        case dropdownType.pickGlobalValue:
            return <PickGlobalValue {...props}/>
        case dropdownType.declareVarType:
            return <DeclareVarType {...props}/>
        case dropdownType.declareVarName:
            return <DeclareVarName {...props}/>
        case dropdownType.declarePanelVar:
            return <DeclarePanelVar {...props}/>

        case dropdownType.pickChoice:
            return <PickChoice {...props}/>
        case dropdownType.pickHealth:
            return <PickHealth {...props}/>
        case dropdownType.pickTrigger:
            return <PickTrigger {...props}/>
        case dropdownType.pickUid:
            return <PickUid {...props}/>
        case dropdownType.pickRole:
            return <SearchBoard {...props} boardType={boardType.roles.key}/>
        case dropdownType.pickLibrary:
            return <SearchBoard {...props} boardType={boardType.library.key}/>
        case dropdownType.pickRoleTeam:
            return <PickRoleTeam {...props}/>
        case dropdownType.pickGlobalVar:    
            return <PickGlobalVar {...props}/>
        case dropdownType.pickRecipient:
            return <PickRecipient {...props}/>
        case dropdownType.varItemConstant:
            return <VarItemConstant {...props}/>
        
        //NumberViews
        case dropdownType.pickNumValue:
            return <PickNumValue {...props}/>
        default:
            return null
    }
}