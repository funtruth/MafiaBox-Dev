import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateType, updateFamilyType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'
import UpdateType from './UpdateType';

class PickBoolean extends React.Component{
    _select = (item) => {
        this.props.updatePage({
            update: this.props.update,
            mutate: this.props.mutate,
            value: item.key,
            updateViewType: item.updateViewType,
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const value = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof value === 'string' && value === item.key
        
        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    render() {
        let items = _.filter(updateType, i => i.family === updateFamilyType.boolean)
        items = _.sortBy(items, i => i.index)
        
        return (
            <div>
                {items.map(this._renderItem)}
                <UpdateType {...this.props}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        update: state.template.update,
        mutate: state.template.mutate,
    }),
    {
        updatePageByPath,
    }
)(PickBoolean)