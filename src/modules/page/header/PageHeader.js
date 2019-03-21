import React from 'react'
import './PageHeader.css'
import { connect } from 'react-redux'

import { navigate } from '../../navigation/NavReducer'
import { showModal } from '../../modal/ModalReducer'

import PagePublishing from './PagePublishing'
import PageOptions from './PageOptions'

function PageHeader(props) {
    const { pageKey, location, match } = props
    if (match) return null

    let handleResize = () => {
        props.navigate(`${location.pathname}/${pageKey}`)
        props.showModal()
    }

    return (
        <div className="row page-header">
            <div className="row page-header-button" onClick={handleResize}>
                <i className="page-header-icon mdi mdi-arrow-expand"></i>
                Open as Page
            </div>
            <div style={{ marginRight: 'auto' }}/>
            <PagePublishing {...props}/>
            <PageOptions/>
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