import React from 'react'

import { palette } from '../../components/Standards';

import { LogicButton } from '../../components/Common';

export default function BasicOp({children, color, bg}) {
    return (
        <div style={{padding: 4}}>
            <LogicButton
                highlight={color}
                bg={bg}
                style={{
                    position: 'relative',
                    maxWidth: '',
                    borderRight: `4px solid ${palette(color)}`,
                    borderTop: `1px dashed ${palette('grey')}`,
                    borderBottom: `1px dashed ${palette('grey')}`,
                }}
            >
                {children}
            </LogicButton>
        </div>
    );
}