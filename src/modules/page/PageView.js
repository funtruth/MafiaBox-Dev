import React from 'react'
import { connect } from 'react-redux'
import './page.css'

import PageHeader from './header/PageHeader';
import PageAbstract from './components/PageAbstract'
import FieldView from '../fields/FieldView';
import { IS_PUBLISHED } from '../common/arrows';

function PageView(props) {
    const { pageKey, pageRepo } = props

    const propsExt = {
        ...props,
        pageInfo: pageRepo[pageKey]||{},
        published: IS_PUBLISHED(pageKey, pageRepo),
    }
    console.log("PageView console", pageRepo[pageKey])
    
    return (
        <div className="page">
            <PageHeader {...propsExt}/>
            <div className="page-content">
                <PageAbstract {...propsExt}/>
                <FieldView {...propsExt}/>
            </div>
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    })
)(PageView)