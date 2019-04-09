import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

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

function ShowUidSubfield(props) {
    const { attachVar, subfieldKey, updateRef } = props

    //get config for uid/wildcard field
    const config = getUpdateConfig(concatField(subfieldKey, WILD_CHAR), updateRef)
    
    const uids = _.filter(attachVar, VARTYPE_IS_UID)
    
    return (
        <>
            <DropTitle>subfields</DropTitle>
            {uids.map(item => (
                <DropParent
                    {...props}
                    key={item.key}
                    dropdownType={config.dropdown}
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

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(ShowUidSubfield)