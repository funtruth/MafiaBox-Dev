import React from 'react'

import { concatField } from '../../logic/proptool';

import { DropTitle } from '../components/Common';
import Input from '../../components/Input';

//source: LogicItem > LogicDeclare
export default function DeclareVarName({
    varItem,
    scope,//logicItem.key
    path,//path to variable through vars repo
    parsePath,//OPTIONAL path to LOGIC_ITEM_VAR, only changes value/display
    updateGeneral,
    showDropdown,
}){
    const onSubmit = text => {
        updateGeneral({
            path,
            update: {
                ...varItem,
                value: concatField("", text),
                display: text,
                subfield: text,
                fields: [
                    text,
                ],
                fieldLength: 1,
                declare: '',
                scope,
            },
        }, {
            path: parsePath,
            update: {
                ...varItem,
                value: concatField("", text),
                display: text,
            },
        })
        showDropdown();
    }
    
    return (
        <>
            <DropTitle>declare</DropTitle>
            <Input
                autofocus
                theme="tag"
                value={varItem.display}
                onSubmit={onSubmit}
                showSubmit
                placeholder="Variable name ..."
                outerprops={{sizes: ['z', 'xs']}}
                type="text"
            />
        </>
    )
}