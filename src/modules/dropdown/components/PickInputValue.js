import React from 'react'
import { connect } from 'react-redux'

import { showDropdownByKey } from '../DropdownReducer'

class PickUpdateValue extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    _onSubmit = (value) => {
        const { dropdownParams } = this.props
        const { pageKey, fieldKey, indexKey, subfieldKey } = dropdownParams
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, 'value', value)
        this.props.showDropdownByKey()
    }

    render() {
        return (
            <div>
                <input
                    className="tag-input menu-voidclick"
                    value={this.state.value}
                    onChange={this._onType}
                    placeholder="Search for page"
                    type='text'
                    autoFocus
                />
                <div className="drop-down-menu-separator"/>
                <div className="drop-down-menu-option" onClick={this._deleteItem}>
                    <i className={`drop-down-menu-icon ion-md-close`}></i>
                    Save
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        boardRepo: state.page.boardRepo,
        pageRepo: state.page.pageRepo,
        storyMap: state.page.storyMap,
    }),
    {
        showDropdownByKey,
    }
)(PickUpdateValue)