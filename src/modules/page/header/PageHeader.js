import React from 'react'
import './PageHeader.css'
import { connect } from 'react-redux'

import { navigate } from '../../navigation/NavReducer'
import { showModal } from '../../modal/ModalReducer'

import PagePublishing from './PagePublishing'

function PageHeader(props) {
    const { pageKey, path, location, match } = props
    if (match) return null

    let handleResize = () => {
        props.navigate(`${location.pathname}/${pageKey}`)
        props.showModal()
    }

    let handlePublish = () => {
        props.updatePage(path, {
            published: true,
            publishedAt: Date.now(),
        })
    }

    return (
        <div className="row page-header">
            <div className="row page-header-button" onClick={handleResize}>
                <i className="page-header-icon mdi mdi-arrow-expand"></i>
                Open as Page
            </div>
            <div style={{ marginRight: 'auto' }}/>
            <PagePublishing {...props}/>
            <div className="row page-header-button" onClick={handlePublish}>
                <i className="ion-ios-more"></i>
            </div>
        </div>
    )
}

export default connect(
    null,
    {
        navigate,
        showModal,
    }
)(PageHeader)