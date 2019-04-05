import React from 'react'

import { VAR_DEFAULTS } from '../../logic/types';

import DropTitle from '../components/DropTitle';

export default function PickTeam(props) {
    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            update: this.props.update,
            mutate: this.props.mutate,
            updateViewType: item.updateViewType,
            value: item.key,
        })
        this.props.showDropdown()
    }

    const renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const selectedKey = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof selectedKey === 'string' && selectedKey === item.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                <i className="mdi mdi-check"/>
            </div>
        )
    }

    return (
        <>
            <DropTitle>team</DropTitle>
        </>
    )
}