import React from 'react'

import ModalOptions from '../components/ModalOptions';
import NumberView from '../../numbers/NumberView';
import Body from '../../components/Body';

export default function EditNumber({ path, scopedVars }) {
    return (
        <Body
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
        </Body>
    )
}