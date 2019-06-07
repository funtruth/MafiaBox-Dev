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

        //should encorporate props.deleteVariables() function as well
        props.updatePage(path, logicItem.down)*/
    }

    return (
        <div>
            <Icon
                icon="window-close"
                size="m" color="grey"
                hover onClick={handleDelete}
            ></Icon>
        </div>
    )
}