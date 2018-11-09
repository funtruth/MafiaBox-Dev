import React from 'react'

class InputField extends React.Component{
    _onChange = e => {
        const { updatePage, pageInfo, field } = this.props
        const { pageKey } = pageInfo

        updatePage(pageKey, field, e.target.value)
    }

    render() {
        const { pageInfo, field } = this.props

        return (
            <div className="row" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className="story-option ion-md-list" style={{ width: 16 }}></i>
                    {field}
                </div>
                <input
                    className="page-input"
                    value={pageInfo[field]}
                    onChange={this._onChange}
                    placeholder="Empty"
                    type="text"
                />
            </div>
        )
    }
}

export default InputField