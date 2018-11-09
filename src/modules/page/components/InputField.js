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
            <div className="row">
                <div className="page-field-label-width">
                    <div className="page-field-label">
                        {field}
                    </div>
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