import React from 'react'
import { connect } from 'react-redux'

import { updateRepo } from './PageReducer'
import { showModal, popModalTo } from '../modal/ModalReducer'

import PageView from './PageView'

class WindowPageView extends React.Component {
    render() {
        const { match } = this.props
        const { pageKey } = match.params

        const pageProps = {
            pageKey,
            path: [pageKey],
            showModal: this.props.showModal,
            popModalBy: (pops) => this.props.popModalTo(-1 - pops),
            updatePage: this.props.updateRepo,
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
        updateRepo,
        showModal,
        popModalTo,
    }
)(WindowPageView)