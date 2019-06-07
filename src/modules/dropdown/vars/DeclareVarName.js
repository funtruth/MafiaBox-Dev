import React from 'react'

import { concatField } from '../../logic/proptool';

import { DropTitle } from '../components/Common';
import Input from '../../components/Input';

//source: LogicItem > LogicDeclare
export default function DeclareVarName({
    slate,
    path,//path to variable through vars repo
    updateGeneral,
    showDropdown,
}){
    const onSubmit = text => {
        updateGeneral({
            path,
            update: {
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
                value={slate.display}
                onSubmit={onSubmit}
                showSubmit
                placeholder="Variable name ..."
                outerprops={{sizes: ['z', 'xs']}}
                type="text"
            />
        </>
    )
}