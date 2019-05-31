import React from 'react'
import _ from 'lodash'

import {
    concatField,
    getUpdateConfig,
    WILD_CHAR,
} from '../../logic/proptool'

import { VARTYPE_IS_UID } from '../../common/arrows';

import {
    DropParent,
    DropTitle,
} from '../components/Common'

export default function ShowUidSubfield(props) {
    const { attachVar, subfieldKey } = props

    //get config for uid/wildcard field
    const config = getUpdateConfig(concatField(subfieldKey, WILD_CHAR))
    
    const uids = _.filter(attachVar, VARTYPE_IS_UID)
    return (
        <>
            <DropTitle>subfields</DropTitle>
            {uids.map(item => (
                <DropParent
                    key={item.key}
                    dropdown={config.dropdown}
                    showDropdown={props.showDropdown}
                    params={{
                        subfieldKey: concatField(subfieldKey, item.key),
                        subpath: [concatField(subfieldKey, item.key)],
                    }}
                    text={item.key}
                />
            ))}
        </>
    )
}