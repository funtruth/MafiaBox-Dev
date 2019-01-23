import React from 'react'

class AbstractField extends React.Component{
    _onChange = e => {
        const { pageKey, fieldKey } = this.props.pageInfo
        this.props.updatePage(pageKey, fieldKey, e.target.value)
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

export default AbstractField