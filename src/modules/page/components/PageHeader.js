import React from 'react'
import { connect } from 'react-redux'

import { navigate } from '../../navigation/NavReducer'
import { showModal } from '../../modal/ModalReducer'
import { savePageToDB, publishPage } from '../../firebase/FirebaseReducer'

function PageHeader(props) {
    const { pageKey, location, match } = props
    if (match) return null

    let handleResize = () => {
        props.navigate(`${location.pathname}/${pageKey}`)
        props.showModal()
    }

    let handlePublish = () => {
        props.savePageToDB(pageKey)
        props.publishPage(pageKey)
    }

    return (
        <div className="row page-header">
            <div className="row header-button" onClick={handleResize}>
                <i className="option-icon ion-ios-resize"></i>
                Open as Page
            </div>
            <div style={{ marginRight: 'auto' }}/>
            <div className="row header-button" onClick={handlePublish}>
                <i className="option-icon mdi mdi-publish"></i>
                Publish
            </div>
            <div className="row header-button" onClick={handlePublish}>
                <i className="option-icon ion-ios-more"></i>
            </div>
        </div>
    )
}

export default connect(
    null,
    {
        navigate,
        showModal,
        savePageToDB,
        publishPage,
    }
)(PageHeader)