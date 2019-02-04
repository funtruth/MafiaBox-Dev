import React from 'react'

class PageAbstract extends React.Component{
    _onChange = e => {
        this.props.updatePage('title', e.target.value)
    }

    render() {
        return (
            <input
                className="page-title-input"
                value={this.props.pageInfo.title || ''}
                onChange={this._onChange}
                placeholder="Untitled"
                type="text"
                autoFocus={true}
            />
        )
    }
}

export default PageAbstract