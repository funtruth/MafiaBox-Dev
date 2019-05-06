import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';

import { navigateStack } from '../../../navigation/NavReducer'

import { DropClick } from '../../../components/Common';

const RoleGridItem = SortableElement((props) => {
    const { modeKey, modeRepo } = props
    const modeInfo = modeRepo[modeKey] || {}
    const { title } = modeInfo
    
    const handleClick = () => {
        props.navigateStack('mode/' + modeKey)
    }

    return (
        <div
            className="role-grid-item"
            onClick={handleClick}
        >
            <div className="patch-item-title">
                {modeKey || 'Untitled'}
            </div>
            <div className="patch-item-footer">
                <DropClick
                    className="patch-item-option"
                >
                    <i className="mdi mdi-dots-horizontal"></i>
                </DropClick>
            </div>
        </div>
    )
})

export default connect(
    state => ({
        modeRepo: state.page.modeRepo,
    }),
    {
        navigateStack,
    }
)(RoleGridItem)