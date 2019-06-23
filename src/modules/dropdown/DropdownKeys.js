import React from 'react'

import { dropdownType } from '../common/types';

import DropString from './common/DropString';
import DropNumber from './common/DropNumber';
import AccountOptions from './account/AccountOptions'
import PickProject from './account/PickProject'

import EditPlayerNum from './board/EditPlayerNum'
import PatchItemOptions from './board/PatchItemOptions'
import RoleItemOptions from './board/RoleItemOptions'
import AddToRSSMap from './board/AddToRSSMap'

import PageHistory from './page/PageHistory'
import PageOptions from './page/PageOptions'

import PickLogic from './logic/PickLogic';
import PickOperator from './logic/PickOperator';
import PickReturn from './logic/PickReturn'

import CreateTag from './page/CreateTag'
import EditUniqueTag from './page/EditUniqueTag'
import EditGeneralTag from './page/EditGeneralTag'
import CreateGameChoice from './page/CreateGameChoice'
import PickGameChoiceType from './page/PickGameChoiceType'
import CreateGlobalVar from './page/CreateGlobalVar'

import PickVar from './vars/PickVar'
import PickVarSubfield from './vars/PickVarSubfield'
import PickVarTags from './vars/PickVarTags';
import PickVarWithType from './vars/PickVarWithType';
import PickConstWithType from './vars/PickConstWithType';
import PickComparison from './vars/PickComparison'
import ReplaceWildcard from './vars/ReplaceWildcard'
import PickGlobalVar from './vars/PickGlobalVar'
import VarItemConstant from './common/VarItemConstant'
import DeclareVarType from './vars/DeclareVarType'
import DeclareVarName from './vars/DeclareVarName'
import DeclarePanelVar from './vars/DeclarePanelVar'

import PickRecipient from './strings/PickRecipient'

//NumberViews
import PickNumValue from './vars/PickNumValue';
import PickVarType from './vars/PickVarType';

export default function DropdownKeys(props) {
    switch(props.key) {
        case dropdownType.dropString:
            return <DropString {...props}/>
        case dropdownType.dropNumber:
            return <DropNumber {...props}/>
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
        case dropdownType.addToRSSMap:
            return <AddToRSSMap {...props}/>

        case dropdownType.pageHistory:
            return <PageHistory {...props}/>
        case dropdownType.pageOptions:
            return <PageOptions {...props}/>

        case dropdownType.pickLogic:
            return <PickLogic {...props}/>
        case dropdownType.pickOperator:
            return <PickOperator {...props}/>
        case dropdownType.pickReturn:
            return <PickReturn {...props}/>

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
        case dropdownType.createGlobalVar:
            return <CreateGlobalVar {...props}/>
        
        case dropdownType.pickVar:
            return <PickVar {...props}/>
        case dropdownType.pickVarType:
            return <PickVarType {...props}/>
        case dropdownType.pickVarSubfield:
            return <PickVarSubfield {...props}/>
        case dropdownType.pickVarTags:
            return <PickVarTags {...props}/>
        case dropdownType.pickVarWithType:
            return <PickVarWithType {...props}/>
        case dropdownType.pickConstWithType:
            return <PickConstWithType {...props}/>
        case dropdownType.pickComparison:
            return <PickComparison {...props}/>
        case dropdownType.replaceWildcard:
            return <ReplaceWildcard {...props}/>
        case dropdownType.declareVarType:
            return <DeclareVarType {...props}/>
        case dropdownType.declareVarName:
            return <DeclareVarName {...props}/>
        case dropdownType.declarePanelVar:
            return <DeclarePanelVar {...props}/>

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