import React from 'react'

import ModalConnect from '../modal/ModalConnect'
import { modalType } from '../modal/types';

export default function WindowPageView({match}) {
    const { pageKey } = match.params

    return (
        <div className="story-view">
            {ModalConnect({
                item: {
                    key: modalType.showPage,
                    path: ['pageRepo', pageKey],
                },
                index: 0,
            })}
        </div>
    )
}