import React, { useState } from 'react'

import {
    Body,
    Text,
} from '../../../../components/Common'
import RolePickerHeader from './RolePickerHeader';
import RolePickerResultView from './RolePickerResultView'

export default function RolePicker(props) {
    const { modeKey, draftInfo } = props

    const [tab, setTab] = useState(0)
    
    const [results, setResults] = useState([])
    
    return (
        <Body
            className="--slide-bottom"
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
                <Body sizes={['xs', 'xl']} bg="charcoal">
                    {results.map(item => (
                        <RolePickerResultView
                            key={item.key}
                            modeKey={modeKey}
                            draftInfo={draftInfo}
                            item={item}
                        />
                    ))}
                    {results.length === 0 &&
                        <Text size="s" color="grey">Nothing is here yet.</Text>
                    }
                </Body>
            </div>
        </Body>
    )
}