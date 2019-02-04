import React from 'react'
import { connect } from 'react-redux'

class EditVar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: props.tagKey
        }
    }

    _onSave = () => {
        const { pageRepo, pageKey, fieldKey, tagKey } = this.props

        if (tagKey === this.state.value) return this.props.showDropdown()

        let varsClone = Object.assign({}, pageRepo[pageKey].vars)

        varsClone[this.state.value] = {
            ...varsClone[tagKey],
            key: this.state.value    
        }
        delete varsClone[tagKey]

        this.props.updatePage(fieldKey, varsClone)
        this.props.showDropdown()
    }

    _onDelete = () => {
        const { pageRepo, pageKey, fieldKey } = this.props

        let varsClone = Object.assign({}, pageRepo[pageKey].vars)
        delete varsClone[this.state.value]

        this.props.updatePage(pageKey, fieldKey, varsClone)
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

export default connect(
    state => ({
        pageRepo: state.page.pageRepo
    }),
)(EditVar)