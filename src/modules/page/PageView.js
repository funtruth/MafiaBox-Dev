import React from 'react'
import './page.css'

import PageHeader from './components/PageHeader';
import PageAbstract from './components/PageAbstract'
import FieldView from '../fields/FieldView';

export default function PageView(props) {
    console.log("PageView console", props.slate)
    return (
        <>
            <PageHeader {...props}/>
            <div className="page-content">
                <PageAbstract {...props}/>
                <FieldView {...props}/>
            </div>
        </>
    )
}