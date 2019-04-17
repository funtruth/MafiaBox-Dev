import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc';

import { showModal } from '../../../modal/ModalReducer'
import { dropdownType } from '../../../dropdown/types'

import { DropClick } from '../../../components/Common';

const PatchGridItem = SortableElement((props) => {
    const { storyKey, storyRepo } = props
    const storyInfo = storyRepo[storyKey] || {}

    const { boardType, title } = storyInfo
    
    const handleClick = (e) => {
        if (e.target.classList.contains('patch-item')) {
            props.onClick(storyKey) //cancelling improperly
        }
    }

    return (
        <div
            className="patch-item"
            onClick={handleClick}
        >
            <div className="patch-item-title">
                {title || 'Untitled'}
            </div>
            <div className="patch-item-footer">
                <DropClick
                    className="patch-item-options"
                    dropdown={dropdownType.patchItemOptions}
                    params={{
                        boardType,
                        storyKey,
                    }}
                >
                    <i className="mdi mdi-dots-horizontal"></i>
                </DropClick>
            </div>
        </div>
    )
})

export default connect(
    state => ({
        storyRepo: state.page.storyRepo,
    }),
    {
        showModal,
    }
)(PatchGridItem)