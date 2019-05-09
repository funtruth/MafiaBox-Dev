import React, { useState, useEffect } from 'react'

import {
    Body,
} from '../../../../components/Common'
import RolePickerHeader from './RolePickerHeader';
import RolePickerResultView from './RolePickerResultView'

export default function RolePicker(props) {
    const { modeKey, draftInfo } = props

    const [tab, setTab] = useState(0)
    
    const [results, setResults] = useState([])
    console.log({results, draftInfo})
    return (
        <Body
            className="--basic-slide"
            sizes={['xs', 'xs']}
        >
            <div style={{borderRadius: 8, overflow: 'hidden'}}>
                <RolePickerHeader
                    modeKey={modeKey}
                    draftInfo={draftInfo}
                    tab={tab}
                    setTab={setTab}
                    setResults={setResults}
                />
                {results.map(item => (
                    <RolePickerResultView
                        key={item.key}
                        modeKey={modeKey}
                        draftInfo={draftInfo}
                        item={item}
                    />
                ))}
            </div>
        </Body>
    )
}