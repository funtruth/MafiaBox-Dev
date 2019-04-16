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
    const { prefix, value, data, updateSource, vars, path } = props
    
    if (!data) return null;
    const { display } = data

    const attach = value.data || {}

    const fields = separateField(prefix)
    
    return (
        <div className="row" style={{ marginTop: 2 }}>
            {fields.map((field, index) => {
                const shortPrefix = combineFields(fields.slice(0, index + 1))
                const config = getUpdateConfig(shortPrefix)

                return (
                    <div
                        key={field}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        {!!index && <Icon className="mdi mdi-chevron-right" color="whitish" size="l"></Icon>}
                        <div
                            className="logic-button app-onclick"
                            highlight="true"
                            menu-type={config.dropdown}
                            app-onclick-props={JSON.stringify({
                                subfieldKey: shortPrefix,
                                attach,
                                currentValue: attach[shortPrefix] || {},
                                attachVar: vars,
                                path,
                                subpath: [shortPrefix],
                                updateSource,
                            })}
                            style={{
                                color: '#999',
                                borderLeft: '4px solid #a566b0',
                            }}
                        >
                            {field}
                            {index + 1 === fields.length && 
                                <div className="logic-display">
                                    {display}
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}