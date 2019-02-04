import React from 'react'

class EditVar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: props.currentValue,
        }
    }

    _onSave = () => {
        const { currentValue } = this.props

        if (currentValue === this.state.value) {
            return this.props.showDropdown()
        }

        this.props.updatePage({
            name: this.state.value, 
        })
        this.props.showDropdown()
    }

    _onDelete = () => {
        this.props.updatePage({
            name: '',
        })
        this.props.showDropdown()
    }

    _onChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    _onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                this._onSave()
                break
            default:
        }
    }

    render() {
        return (
            <div>
                <input
                    className="tag-input"
                    value={this.state.value}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="Untitled"
                    type='text'
                    autoFocus
                />
                <div className="-sep"/>
                <div className="drop-down-menu-option" onClick={this._onSave}>
                    <i className={`drop-down-menu-icon ion-ios-save`}></i>
                    Save
                </div>
                <div className="drop-down-menu-option" onClick={this._onDelete}>
                    <i className={`drop-down-menu-icon ion-ios-trash`}></i>
                    Delete
                </div>
            </div>
        )
    }
}

export default EditVar