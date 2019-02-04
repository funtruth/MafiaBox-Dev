import React from 'react'
import { connect } from 'react-redux'

import { updatePageByPath } from './PageReducer'
import { showModal, popModalTo } from '../modal/ModalReducer'

import PageView from './PageView'

class WindowPageView extends React.Component {
    render() {
        const { match } = this.props
        const { pageKey } = match.params

        const pageProps = {
            pageKey,
            showModal: this.props.showModal,
            popModalBy: (pops) => this.props.popModalTo(-1 - pops),
            updatePage: (fieldKey, value) => this.props.updatePageByPath(
                pageKey,
                fieldKey,
                value,
            )
        }

        return (
            <div className="story-view">
                <PageView {...pageProps}/>
            </div>
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
        showModal,
        popModalTo,
    }
)(WindowPageView)