import React from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { boardType } from '../../common/types';

import { navigate } from '../../app/NavReducer'

import AccountDetails from '../components/AccountDetails';
import ProjectDetails from '../components/ProjectDetails';
import SideBarTitle from './SideBarTitle'
import { Body, Tag } from '../../components/Common';

//gets pathname from react-router
export default function SideBarView({ pathname }) {
    const dispatch = useDispatch();
    const path = useSelector(state => state.nav.path);
    
    const activeProject = useSelector(state => state.firebase.activeProject);
    
    let handleClick = (path) => {
        if (!activeProject) {
            return;
        }

        dispatch(navigate(path))
        return;
    }

    let renderItem = (item) => {
        const itemPath = `/${activeProject}/${item.key}`
        const selected = itemPath === pathname
        
        return (
            <Tag
                key={item.key}
                bg="charcoal"
                color={selected ? 'whitish' : 'grey'}
                icon={item.icon}
                text={item.title}
                onClick={() => handleClick(itemPath)}
            />
        )
    }

    const items = _.sortBy(boardType, i => i.index)

    return (
        <Body bg="charcoal">
            <AccountDetails/>
            <SideBarTitle text="Project"/>
            <ProjectDetails activeProject={activeProject}/>
            <SideBarTitle text="Develop"/>
            <Tag
                bg="charcoal"
                color={pathname === `/${activeProject}` ? 'whitish' : 'grey'}
                icon="home"
                text="Home"
                onClick={() => handleClick(`/${activeProject}`)}
            />
            {items.map(renderItem)}
            {pathname !== path &&  <Redirect to={path}/>}
        </Body>
    )
}