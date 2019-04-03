import React from 'react'
import {
    separateField,
    getUpdateConfig,
    combineFields,
} from '../proptool'

import {
    Icon,
} from '../../components/Common'

export default function LogicUpdateItem(props) {
    const { prefix, data, updateRef, value, updateSource, vars, path } = props

    const fields = separateField(prefix)
    
    return (
        <div className="row-nowrap" style={{ marginTop: 2 }}>
            {fields.map((field, index) => {
                const shortPrefix = combineFields(fields.slice(0, index + 1))
                const config = getUpdateConfig(shortPrefix, updateRef)

                return (
                    <div
                        key={field}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            className="logic-button app-onclick"
                            menu-type={config.dropdown}
                            app-onclick-props={JSON.stringify({
                                subfieldKey: shortPrefix,
                                attach: value.data || {},
                                attachVar: vars,
                                path,
                                subpath: [shortPrefix],
                                updateSource,
                            })}
                            style={{
                                color: '#999',
                                borderLeft: '4px solid #18449b',
                            }}
                        >
                            {field}
                        </div>
                        <Icon className="mdi mdi-chevron-right" color="whitish" size="l"></Icon>
                    </div>
                )
            })}
        </div>
    )
}