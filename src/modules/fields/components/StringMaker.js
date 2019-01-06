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
            value: this.props.value[item].value,
        })
    }

    _onSave = () => {
        const { pageInfo, fieldKey, value } = this.props
        const { pageKey } = pageInfo

        const target = this.state.target || Object.keys(value || {}).length

        this.props.updatePageByPath(pageKey, fieldKey, target, 'value', this.state.value)

        this.setState({
            mode: VIEW_MODE,
        })
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
                    <div 
                        className="page-field-label"
                        onClick={this._showEditMode}
                    >
                        Edit
                    </div>
                    <div
                        className="page-field-label"
                        onClick={this._onSave}
                    >
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
                                >{value[item].value}</div>
                            )
                        })}
                    </div>
                    :<div>
                        <textarea
                            value={this.state.value || ''}
                            onChange={this._onChange}
                            onKeyDown={this._onKeyPress}
                            style={{
                                marginTop: 6,
                            }}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default StringMaker