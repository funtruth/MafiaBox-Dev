import React from 'react'

import CodeField from '../../code/CodeField'
import Modal from './Modal'

export default function ModalCodeView(props) {
    const { code } = props

    return (
        <Modal>
            <div style={{ width: '50vw', height: '50vh' }}> 
                <CodeField
                    code={code}
                    options={{
                        readOnly: 'nocursor',
                    }}
                />
            </div>
        </Modal>
    )
}