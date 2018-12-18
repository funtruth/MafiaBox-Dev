import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePage } from '../../page/PageReducer'

class EditVar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: props.dropdownParams.tagKey
        }
    }

    _onSave = () => {
        const { pageRepo, dropdownParams } = this.props
        const { pageKey, tagKey } = dropdownParams

        if (tagKey === this.state.value) return this.props.showDropdownByKey()

        let varsClone = {}
        Object.assign(varsClone, pageRepo[pageKey].vars)

        varsClone[this.state.value] = {
            ...varsClone[tagKey],
            key: this.state.value    
        }
        delete varsClone[tagKey]

        this.props.updatePage(pageKey, 'vars', varsClone)
        this.props.showDropdownByKey()
    }

    _onDelete = () => {
        const { pageRepo, dropdownParams } = this.props
        const { pageKey } = dropdownParams

        let varsClone = {}
        Object.assign(varsClone, pageRepo[pageKey].vars)
        delete varsClone[this.state.value]

        this.props.updatePage(pageKey, 'vars', varsClone)
        this.props.showDropdownByKey()
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
                    className="tag-input menu-voidclick"
                    value={this.state.value}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    placeholder="Untitled"
                    type='text'
                    autoFocus
                />
                <div className="drop-down-menu-separator"/>
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
    {
        showDropdownByKey,
        updatePage,
    }
)(EditVar)