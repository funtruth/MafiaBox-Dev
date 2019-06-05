import React from 'react'
import './page.css'

import { IS_PUBLISHED } from '../common/arrows';

import PageHeader from './header/PageHeader';
import PageAbstract from './components/PageAbstract'
import FieldView from '../fields/FieldView';

export default function PageView(props) {
    const { slate } = props
    const propsExt = {
        ...props,
        pageInfo: slate,
        published: IS_PUBLISHED(slate),
    }
    console.log("PageView console", slate)
    
    return (
        <>
            <PageHeader {...propsExt}/>
            <div className="page-content">
                <PageAbstract {...propsExt}/>
                <FieldView {...propsExt}/>
            </div>
        </>
    )
}