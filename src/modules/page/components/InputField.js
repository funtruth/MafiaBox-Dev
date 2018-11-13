import React from 'react'

class InputField extends React.Component{
    _onChange = e => {
        const { pageInfo, field } = this.props
        const { pageKey } = pageInfo

        this.props.updatePage(pageKey, field, e.target.value)
    }

    render() {
        const { pageInfo, fieldInfo, field } = this.props

        return (
            <div className="row" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className="story-option ion-md-list" style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
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