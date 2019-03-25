import React from 'react'
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd'

import { droppableType } from '../../../common/types'

import PatchListItem from './PatchListItem'

function PatchList(props) {
    const { storyKey, pageRepo, pageMap, title } = props
    const roleInfo = pageMap[storyKey] || {}

    const hasItems = !!roleInfo.length

    return (
        <div className="patch-list-container">
            <div className="black-grey story-label">
                {title}
            </div>
            <Droppable
                droppableId={`${droppableType.page}.${storyKey}`}
                type={title}
            >
                {(provided, snapshot) => (
                    <div
                        className="patch-list-drop"
                        ref={provided.innerRef}
                    >
                        {hasItems ? roleInfo.map((item, index) => {
                                const pageInfo = pageRepo[item]

                                return (
                                    <PatchListItem
                                        key={item}
                                        pageInfo={pageInfo}
                                        index={index}
                                    />
                                )
                            })
                            :<div className="story-empty">
                                There is nothing here yet.
                            </div>
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        pageMap: state.page.pageMap,
    })
)(PatchList)