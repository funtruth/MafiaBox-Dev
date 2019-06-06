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
    const paths = pathname.split('/')
    
    const dispatch = useDispatch();
    const path = useSelector(state => state.nav.path);
    
    const activeProject = useSelector(state => state.firebase.activeProject);
    
    let handleClick = (item) => {
        if (!activeProject) {
            return;
        }

        dispatch(navigate("/" + activeProject + "/" + item.key))
        return;
    }

    let renderItem = (item) => {
        const selected = item.key === paths[2]

        return (
            <Tag
                key={item.key}
                bg="charcoal"
                color={selected ? 'whitish' : 'grey'}
                icon={item.icon}
                text={item.title}
                onClick={() => handleClick(item)}
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
            {items.map(renderItem)}
            {pathname !== path &&  <Redirect to={path}/>}
        </Body>
    )
}