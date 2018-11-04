import React from 'react'
import './roles.css'
import { connect } from 'react-redux'

import { itemType } from './types'

import InputItem from './components/InputItem'
import BlurInputItem from './components/BlurInputItem'
import PropertyItem from './components/PropertyItem';

class RoleView extends React.Component{
    _renderItem = (item) => {
        switch(item.type) {
            case itemType.input:
                return <InputItem name={item.key} label={item.title} placeholder={item.placeholder}/>
            case itemType.blurInput:
                return <BlurInputItem name={item.key} label={item.title}/>
            case itemType.tag:
                return <PropertyItem name={item.key} label={item.title} data={item.data}/>
            default:
                return null
        }
    }

    render() {
        return (
            <div style={styles.container}>
                {this.props.fields.map(this._renderItem)}
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 1,
    }
}

export default connect(
    state => ({
        fields: state.roles.fields,
    })
)(RoleView)