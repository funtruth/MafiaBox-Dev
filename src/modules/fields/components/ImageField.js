import React from 'react'

import { modalType } from '../../modal/types';

import {
    Body,
    Tag,
    DropClick,
} from '../../components/Common'

export default function ImageField({path, value}) {
    return (
        <Body x="l">
            {value &&
                <div
                    style={{
                        width: 150,
                        height: 200,
                        margin: 12,
                        backgroundImage: `url(${value})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
            }
            <DropClick
                modal={modalType.pickSprite}
                params={{
                    path,
                }}
            >
                <Tag
                    icon="image-search"
                    text="Select ..."
                />
            </DropClick>
        </Body>
    )
}