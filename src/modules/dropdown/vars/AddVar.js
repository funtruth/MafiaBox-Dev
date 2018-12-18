import React from 'react'
import { connect } from 'react-redux'

import { variableType } from '../../logic/types'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class AddVar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
    }

    _onChange = e => {
        this.setState({
            value: e.target.value
        })
    }

    _onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                this._confirm()
                break
            default:
        }
    }

    _confirm = () => {
        const { pageRepo, dropdownParams } = this.props
        const { pageKey } = dropdownParams
        const { value } = this.state

        const pageInfo = pageRepo[pageKey]
        
        if (true) {
            let varsClone = {}
            Object.assign(varsClone, pageInfo.vars)
            varsClone[this.state.value] = {}
            let varsValue = {
                key: value,
                variableType: variableType.any.key
            }
    
            this.props.updatePageByPath(pageKey, 'vars', value, varsValue)
            this.props.showDropdownByKey()
        } else {

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
                <div className="drop-down-menu-option" onClick={this._confirm}>
                    <i className={`drop-down-menu-icon ion-md-checkbox`}></i>
                    Create
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showDropdownByKey,
        updatePageByPath,
    }
)(AddVar)