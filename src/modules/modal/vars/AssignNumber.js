import React from 'react'

import ModalOptions from '../components/ModalOptions'
import NumberView from '../../numbers/NumberView';

export default function AssignNumber(props) {
    const { path, scopedVars } = props
    
    return (
        <div
            style={{
                minWidth: 600,
                maxWidth: '90vw',
            }}
        >
            <NumberView
                path={path}
                scopedVars={scopedVars}
            />
            <ModalOptions/>
        </div>
    )
}