import React from 'react'
import { dropdownType, variableType } from '../../common/types';
import { DropClick, Tag } from '../../components/Common';

export default function ModePhaseView({path}) {
    return (
        <DropClick
            dropdown={dropdownType.pickVarWithType}
            params={{
                baseVar: {
                    variableTypes: [variableType.key.key],
                },
                path: [...path, 'source'],
            }}
        >
            <Tag
                icon="brightness-7"
                text="firstPhase"
            />
        </DropClick>
    )
}