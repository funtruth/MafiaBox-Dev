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

import CreateUniqueTag from './page/CreateUniqueTag'
import EditUniqueTag from './page/EditUniqueTag'
import CreateGeneralTag from './page/CreateGeneralTag'
import EditGeneralTag from './page/EditGeneralTag'
import CreateGameChoice from './page/CreateGameChoice'
import PickGameChoiceType from './page/PickGameChoiceType'
import WriteGameChoice from './page/WriteGameChoice'
import CreateGlobalVar from './page/CreateGlobalVar'

import AddVar from './functions/AddVar'
import EditVar from './functions/EditVar'
import EditVarName from './functions/EditVarName'
import PickVarType from './functions/PickVarType';
import WriteVarType from './functions/WriteVarType'

import PickVar from './vars/PickVar'
import PickVarSubfield from './vars/PickVarSubfield'
import PickVarWithType from './vars/PickVarWithType';
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
import PickPhase from './update/PickPhase'
import ShowSubfields from './update/ShowSubfields';
import ShowUidSubfield from './update/ShowUidSubfield';
import ShowRoleSubfields from './update/ShowRoleSubfields'
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

        case dropdownType.createUniqueTag:
            return <CreateUniqueTag {...props}/>
        case dropdownType.editUniqueTag:
            return <EditUniqueTag {...props}/>
        case dropdownType.createGeneralTag:
            return <CreateGeneralTag {...props}/>
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
        
        case dropdownType.addVar:
            return <AddVar {...props}/>
        case dropdownType.editVar:
            return <EditVar {...props}/>
        case dropdownType.editVarName:
            return <EditVarName {...props}/>
        case dropdownType.pickVar:
            return <PickVar {...props}/>
        case dropdownType.pickVarSubfield:
            return <PickVarSubfield {...props}/>
        case dropdownType.pickVarWithType:
            return <PickVarWithType {...props}/>
        case dropdownType.pickUidObject:
            return <PickUidObject {...props}/>
        case dropdownType.pickVarType:
            return <PickVarType {...props}/>
        case dropdownType.pickComparison:
            return <PickComparison {...props}/>
        case dropdownType.writeVarType:
            return <WriteVarType {...props}/>
        case dropdownType.replaceWildcard:
            return <ReplaceWildcard {...props}/>
        case dropdownType.pickGlobalValue:
            return <PickGlobalValue {...props}/>
            
        case dropdownType.pickBooleanAssign:
            return <PickBooleanAssign {...props}/>
        case dropdownType.pickUidAssign:
            return <PickUidAssign {...props}/>
        case dropdownType.declareVarType:
            return <DeclareVarType {...props}/>

        case dropdownType.pickBoolean: 
            return <PickBoolean {...props}/>
        case dropdownType.pickChoice:
            return <PickChoice {...props}/>
        case dropdownType.pickHealth:
            return <PickHealth {...props}/>
        case dropdownType.pickTimer:
            return <PickTimer {...props}/>
        case dropdownType.pickTrigger:
            return <PickTrigger {...props}/>
        case dropdownType.pickUid:
            return <PickUid {...props}/>
        case dropdownType.pickPhase:
            return <PickPhase {...props}/>
        case dropdownType.pickRole:
            return <SearchBoard {...props} boardType={boardType.roles.key}/>
        case dropdownType.pickLibrary:
            return <SearchBoard {...props} boardType={boardType.library.key}/>
        case dropdownType.showSubfields:
            return <ShowSubfields {...props}/>
        case dropdownType.showUidSubfield:
            return <ShowUidSubfield {...props}/>
        case dropdownType.showRoleSubfields:
            return <ShowRoleSubfields {...props}/>
        case dropdownType.pickRoleTeam:
            return <PickRoleTeam {...props}/>
        case dropdownType.pickGlobalVar:    
            return <PickGlobalVar {...props}/>
        case dropdownType.pickRecipient:
            return <PickRecipient {...props}/>
        
        //NumberViews
        case dropdownType.pickNumValue:
            return <PickNumValue {...props}/>
        default:
            return null
    }
}