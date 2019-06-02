import React from 'react'

import ModalOptions from '../components/ModalOptions';
import NumberView from '../../numbers/NumberView';

export default function EditNumber(props) {
    const { path, close, scopedVars } = props
    
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
            <ModalOptions onClose={close}/>
        </div>
    )
}