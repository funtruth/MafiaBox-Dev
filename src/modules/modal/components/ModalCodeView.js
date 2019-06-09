import React from 'react'

import CodeField from '../../code/CodeField'

var beautify_js = require('js-beautify');

export default function ModalCodeView({ code }) {
    let prettyCode = beautify_js(code, {brace_style: 'end-expand'})

    return (
        <div style={{ width: '50vw', height: '50vh' }}> 
            <CodeField
                code={prettyCode}
                options={{
                    readOnly: 'nocursor',
                }}
            />
        </div>
    )
}