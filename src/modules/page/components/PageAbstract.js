import React from 'react'
import { connect } from 'react-redux'

import { updateRepo } from '../PageReducer'

//TODO this is hacky
class PageAbstract extends React.Component{
    _onChange = e => {
        const { pageInfo } = this.props
        this.props.updateRepo(
            [pageInfo.pageKey],
            {
                title: e.target.value,
            }
        )
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

export default connect(
    null,
    {
        updateRepo,
    }
)(PageAbstract)