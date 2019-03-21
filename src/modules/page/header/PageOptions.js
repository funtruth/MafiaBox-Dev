import React from 'react'

import { dropdownType } from '../../dropdown/types';

export default function PageOptions(props) {
    return (
        <div
            className="row page-header-button app-onclick"
            menu-type={dropdownType.pageOptions}
        >
            <i className="ion-ios-more"></i>
        </div>
    )
}