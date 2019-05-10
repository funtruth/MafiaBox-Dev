import React from 'react'

import { modalType } from '../../modal/types'

import {
    Icon
} from '../../components/Common'

export default function LogicOptions(props) {
    const { logicItem, parentValue, sourceValue, path } = props

    //e check is to determine the source of the click
    //if source is a confirmation dialog, e is not passed
    const handleDelete = (e) => {
        if (e && logicItem.right) {
            props.showModal(modalType.deleteLogic, {
                onDelete: handleDelete,
            })
            return;
        }

        props.updatePage(path, logicItem.down);
    }

    //if logic item is the origin
    if (!sourceValue) return null;
    
    //if logic item belongs to parent and there is no other logic
    if (parentValue && !logicItem.down && !logicItem.right) {
        return null;
    }

    return (
        <div>
            <Icon
                className="mdi mdi-window-close"
                style={{padding: 4}}
                size="m" color="grey"
                hover onClick={handleDelete}
            ></Icon>
        </div>
    )
}