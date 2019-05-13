import React from 'react'

import {
    separateField,
    getUpdateConfig,
    combineFields,
} from '../proptool'

import LogicDetailPanel from './LogicDetailPanel';

export default function LogicMutateItem(props) {
    const { prefix, logicItem, data, updateSource, vars, path } = props
    
    if (!data) return null;

    const attach = logicItem.data || {}

    const fields = separateField(prefix)
    
    return (
        <div className="row" style={{ marginTop: 2 }}>
            {fields.map((field, index) => {
                const shortPrefix = combineFields(fields.slice(0, index + 1))
                const config = getUpdateConfig(shortPrefix)

                return (
                    <LogicDetailPanel
                        key={field}
                        dropdown={config.dropdown}
                        params={{
                            subfieldKey: shortPrefix,
                            attach,
                            currentValue: attach[shortPrefix] || {},
                            attachVar: vars,
                            path,
                            subpath: [shortPrefix],
                            updateSource,
                        }}
                        field={field}
                        color="Mediumslateblue"
                        currentValue={data}
                        isLastPanel={index + 1 === fields.length}
                    />
                )
            })}
        </div>
    )
}