import React from 'react'
import { connect } from 'react-redux'
import { SortableContainer } from 'react-sortable-hoc';

import { boardType } from '../../../fields/defaults';

import { addPageToMap } from '../../../page/PageReducer'

import RoleGridItem from './RoleGridItem';
import EmptyGridComponent from '../../components/EmptyGridComponent';

const RoleGrid = SortableContainer((props) => {
    const { items, storyKey, title, hideAdd } = props

    const handleAdd = () => {
        props.addPageToMap(storyKey, boardType.roles.key)
    }
    
    return (
        <div className="role-grid">
            <div className="role-grid-header">
                <div className="role-grid-title">{title}</div>
                <div className="role-grid-buttons">
                    {!hideAdd && <div className="role-grid-button" onClick={handleAdd}>
                        <i className="mdi mdi-plus" style={{ fontSize: 24 }}></i>
                        Add
                    </div>}
                </div>
            </div>
            {items.map((pageKey, index) => {
                return (
                    <RoleGridItem
                        key={pageKey}
                        pageKey={pageKey}
                        index={index}
                    />
                )
            })}
            <EmptyGridComponent className="role-grid-item" text="Add Role" onClick={handleAdd}/>
        </div>
    )
})

export default connect(
    null,
    {
        addPageToMap,
    }
)(RoleGrid)