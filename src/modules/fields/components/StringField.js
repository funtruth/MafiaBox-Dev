import React from 'react'

import { modalType } from '../../modal/types';

import {
    Body,
    Tag,
    DropClick,
} from '../../components/Common'

export default function StringField({path, value}) {
    return (
        <Body x="l">
            <DropClick
                modal={modalType.editString}
                params={{
                    path,
                }}
            >
                <Tag
                    icon="file-document-edit-outline"
                    text={(value && value.display) || "Select ..."}
                />
            </DropClick>
        </Body>
    )
}