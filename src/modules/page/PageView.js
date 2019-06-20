import React from 'react'

import PageHeader from './components/PageHeader';
import FieldView from '../fields/FieldView';

export default function PageView(props) {
    console.log("PageView console", props.slate)
    
    return (
        <>
            <PageHeader {...props}/>
            <div style={{padding: '4vh 4vw'}}>
                <FieldView {...props}/>
            </div>
        </>
    )
}