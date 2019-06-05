import React from 'react'

import {
    Icon,
} from '../../components/Common';

export default function LogicAddBelow({onClick}) {
    return (
        <div className="logic-panel-add">
            <Icon
                icon="server-plus"
                size="l" color="grey"
                onClick={onClick}
            ></Icon>
        </div>
    )
}