import React from 'react'

class PageAbstract extends React.Component{
    _onChange = e => {
        const { pageKey } = this.props.pageInfo
        this.props.updatePage(pageKey, 'title', e.target.value)
    }

    render() {
        return (
            <div>
                <input
                    className="page-title-input"
                    value={this.props.pageInfo.title || ''}
                    onChange={this._onChange}
                    placeholder="Untitled"
                    type="text"
                    autoFocus={true}
                />
            </div>
        )
    }
}

export default PageAbstract