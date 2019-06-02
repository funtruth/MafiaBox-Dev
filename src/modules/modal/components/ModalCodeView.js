import React from 'react'

import CodeField from '../../code/CodeField'

export default function ModalCodeView(props) {
    const { code } = props

    return (
        <div style={{ width: '50vw', height: '50vh' }}> 
            <CodeField
                code={code}
                options={{
                    readOnly: 'nocursor',
                }}
            />
        </div>
    )
}