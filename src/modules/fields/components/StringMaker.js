import React from 'react'

const VIEW_MODE = 'view-mode'
const EDIT_MODE = 'edit-mode'

class StringMaker extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mode: VIEW_MODE,
            target: null,
            value: '',
        }
    }

    _showViewMode = () => {
        this.setState({
            mode: VIEW_MODE,
        })
    }

    _showEditMode = () => {
        this.setState({
            mode: EDIT_MODE,
            target: null,
            value: '',
        })
    }

    _onEdit = (item) => {
        this.setState({
            mode: EDIT_MODE,
            target: item,
            value: this.props.value[item]
        })
    }

    _onSave = () => {
        const { pageInfo, fieldKey, value } = this.props
        const { pageKey } = pageInfo

        if (this.state.target) {
            this.props.updatePageByPath(pageKey, fieldKey, this.state.target, this.state.value)
            this.setState({
                mode: VIEW_MODE,
            })
        } else {
            this.props.updatePageByPath(pageKey, fieldKey, Object.keys(value || {}).length, this.state.value)
            this.setState({
                mode: VIEW_MODE,
            })
        }
    }

    _onChange = e => {
        this.setState({
            value: e.target.value,
        })
    }

    _onKeyPress = e => {
        switch(e.key) {
            case 'Enter':
            case 'Escape':
                return this._onSave()
            default:
        }
    }

    render() {
        const { value } = this.props

        return (
            <div>
                <div className="row">
                    <div
                        className="page-field-label"
                        onClick={this._showViewMode}
                    >
                        View
                    </div>
                    <div className="page-field-label" onClick={this._showEditMode}>
                        Edit
                    </div>
                    <div className="page-field-label" onClick={this._onSave}>
                        Save
                    </div>
                </div>
                {this.state.mode === VIEW_MODE ?
                    <div style={{ display: 'inline-block' }}>
                        {Object.keys(value || {}).map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="common-cont --grey27"
                                    onClick={this._onEdit.bind(this, item)}
                                    style={{
                                        cursor: 'pointer',
                                        marginTop: 6,
                                        marginRight: 10,
                                    }}
                                >{value[item]}</div>
                            )
                        })}
                    </div>
                    :<div>
                        <div
                            className="textarea"
                            onChange={this._onChange}
                            onKeyDown={this._onKeyPress}
                            contentEditable="true"
                            suppressContentEditableWarning="true"
                            style={{
                                marginTop: 6,
                            }}
                        >{this.state.value || ''}</div>
                    </div>
                }
            </div>
        )
    }
}

export default StringMaker