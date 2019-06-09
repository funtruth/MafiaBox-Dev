import React from 'react'

import { Icon } from '../../components/Common'

export default function LogicOptions({deleteLogic, logicKey, parentKey}) {
    const handleDelete = () => deleteLogic(logicKey, parentKey)

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