import React from 'react'
import { connect } from 'react-redux'

import { navigate } from '../../navigation/NavReducer'
import { showModal } from '../../modal/ModalReducer'
import { publishPage } from '../../firebase/DBReducer'

const leftBtns = [
    { key: 'resize', title: 'Open as Page', icon: 'ion-ios-resize' }
]

const rightBtns = [
    { key: 'share', title: 'Share' },
    { key: 'updates', title: 'Updates' },
    { key: 'options', icon: 'ion-ios-more' },
]

class PageHeader extends React.Component{
    _onClick = (key) => {
        const { pageKey, location } = this.props
        switch(key) {
            case 'resize':
                this.props.navigate(`${location.pathname}/${pageKey}`)
                this.props.showModal()
                break
            case 'updates':
                this.props.publishPage(pageKey)
                break
            default:
        }
    }

    _renderItem = (item, index) => {
        return (
            <div key={item.key} className="row header-button" onClick={this._onClick.bind(this, item.key)}>
                <i className={`option-icon ${item.icon}`}></i>
                {item.icon && item.title && <div style={{ width: 6 }}/>}
                {item.title}
            </div>
        )
    }

    render() {
        const { match } = this.props
        if (match) return null

        return (
            <div className="row page-header">
                {leftBtns.map(this._renderItem)}
                <div style={{ marginRight: 'auto' }}/>
                {rightBtns.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    null,
    {
        navigate,
        showModal,
        publishPage,
    }
)(PageHeader)