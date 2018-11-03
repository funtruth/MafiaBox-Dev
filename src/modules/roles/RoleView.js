import React from 'react'

import InputItem from './components/InputItem'
import PropertyItem from './components/PropertyItem';

const roleTeamTypeData = [
    {
        key: 1,
        label: 'Mafia',
        color: 'rgba(235,87,87,1)',
    },
    {
        key: 2,
        label: 'Town',
        color: 'rgba(18,184,134,1)',
    }
]

const roleActionTypeData = [
    {
        key: 1,
        label: 'Anyone',
        color: 'rgba(40, 43, 48,1)',
    },
    {
        key: 2,
        label: 'Town',
        color: 'rgba(40, 43, 48,1)',
    },
    {
        key: 3,
        label: 'Mafia',
        color: 'rgba(40, 43, 48,1)',
    },
    {
        key: 4,
        label: 'Town',
        color: 'rgba(40, 43, 48,1)',
    },
    {
        key: 5,
        label: 'Alive',
        color: 'rgba(40, 43, 48,1)',
    },
    {
        key: 6,
        label: 'Dead',
        color: 'rgba(40, 43, 48,1)',
    },
    {
        key: 7,
        label: 'Multiple',
        color: 'rgba(40, 43, 48,1)',
    },
]

class RoleView extends React.Component{
    render() {
        return (
            <div style={styles.container}>
                <InputItem name="roleId" label="Unique Role ID" placeholder="1234"/>
                <InputItem name="roleName" label="Role Name" placeholder="Docter, Detective ..."/>
                <InputItem name="roleDesc" label="Role Description" placeholder="Summary of rules ..."/>
                <PropertyItem name="roleTeamType" label="Team" data={roleTeamTypeData}/>
                <PropertyItem name="roleActionType" label="Action Target" data={roleActionTypeData}/>
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 1,
    }
}

export default RoleView