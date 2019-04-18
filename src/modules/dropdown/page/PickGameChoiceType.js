import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { gameChoiceType } from '../../fields/defaults';
import {
    updateField,
} from '../../page/PageReducer'

import {
    DropItem,
    DropTitle,
} from '../components/Common'

export default connect(
    null,
    {
        updateField,
    }
)(function PickGameChoiceType(props) {
    const { currentValue } = props

    const handleSelect = (item) => {
        props.updatePage({
            gameChoice: item.key,
        })
        props.showDropdown();
    }

    const renderItem = (item) => {
        return (
            <DropItem
                key={item.key}
                chosen={item.key === currentValue}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightIcon="mdi mdi-check"
                text={item.title}
            />
        )
    }

    const items = _.toArray(gameChoiceType)
    return (
        <>
            <DropTitle>game choice types</DropTitle>
            {items.map(renderItem)}
        </>
    )
})