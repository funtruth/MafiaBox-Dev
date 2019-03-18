import React from 'react'
import './Header.css'
import { connect } from 'react-redux'

import { developType } from '../../navigation/paths'

import { unnormalize } from '../../common/selectors';
import { navigate } from '../../navigation/NavReducer'

import HeaderSearch from './HeaderSearch';
import HeaderAddItem from './HeaderAddItem';
import HeaderAddStory from './HeaderAddStory';

function HeaderView(props) {
    const { location, pageRepo } = props
    const { pathname } = location
    
    const paths = pathname.split('/')
    const boardPath = paths[2] || ""

    const { addItem, addStory } = developType[boardPath] || {}

    const getPathTitle = (key) => {
        if (developType[key]) {
            return developType[key] && developType[key].label
        }
        else {
            return (pageRepo[key] && pageRepo[key].title) || 'Untitled'
        }
    }

    const onPathClick = (index) => {
        let newPath = paths.slice(0, index + 1).join('/')
        props.navigate(newPath)
    }

    const renderPath = () => {
        return (
            <div className="row" style={{ marginRight: 'auto', alignItems: 'center' }}>
                {paths.map((item, index) => (
                    <div key={index} className="row-centered path-view">
                        {index > 1 ?
                            <div className="path-separator">/</div>
                            :<div style={{width: 2}}/>
                        }
                        {item &&
                            <div className="path-button"
                            onClick={() => onPathClick(index)}
                        >
                            {getPathTitle(item)}
                        </div>}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="header">
            {renderPath()}
            <HeaderSearch/>
            {addItem && <HeaderAddItem/>}
            {addStory && <HeaderAddStory boardType={boardPath}/>}
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: unnormalize(state.page.pageRepo),
    }),
    {
        navigate,
    }
)(HeaderView)