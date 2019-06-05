import React from 'react'

//import { modalType } from '../../modal/types'

import {
    Icon
} from '../../components/Common'

export default function LogicOptions(props) {
    //const { logicItem, path } = props

    //e check is to determine the source of the click
    //if source is a confirmation dialog, e is not passed
    const handleDelete = (e) => {
        console.warn('TODO')
        return;

        /*if (e && logicItem.right) {
            props.showModal(modalType.deleteLogic, {
                onDelete: handleDelete,
            })
            return;
        }

        props.updatePage(path, logicItem.down)*/
    }

    return (
        <div>
            <Icon
                className="window-close"
                style={{padding: 4}}
                size="m" color="grey"
                hover onClick={handleDelete}
            ></Icon>
        </div>
    )
}