import React from 'react'

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

    }
    _renderItem = (item, index) => {
        return (
            <div key={item.key} className="row page-header-button" onClick={this._onClick.bind(this, item.key)}>
                <i className={`option-icon ${item.icon}`}></i>
                {item.icon && item.title && <div style={{ width: 6 }}/>}
                {item.title}
            </div>
        )
    }

    render() {
        return (
            <div className="row page-header">
                {leftBtns.map(this._renderItem)}
                <div style={{ marginRight: 'auto' }}/>
                {rightBtns.map(this._renderItem)}
            </div>
        )
    }
}

export default PageHeader