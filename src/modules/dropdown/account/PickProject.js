import React from 'react'
import _ from 'lodash'
import { useSelector } from 'react-redux'

import { modalType } from '../../common/types';

import ProjectListItem from '../../home/components/ProjectListItem';
import { DropClick, Tag, Separator } from '../../components/Common';

export default function PickProject() {
    const { projectUsers, activeProject } = useSelector(state => state.firebase)

    const projectList = _.filter(projectUsers, i => i && i.key)

    const renderItem = (item) => {
        const chosen = (item.key === activeProject).toString()

        return (
            <ProjectListItem
                key={item.key}
                project={item}
                chosen={chosen}
            />
        )
    }

    return (
        <>
            {projectList.map(renderItem)}
            <Separator t={1} size={8}></Separator>
            <DropClick modal={modalType.createProject}>
                <Tag
                    icon="plus"
                    text="New project"
                />
            </DropClick>
        </>
    )
}