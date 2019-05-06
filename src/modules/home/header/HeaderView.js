import React from 'react'
import './Header.css'
import '../../board/board.css'
import { connect } from 'react-redux'

import { boardType } from '../../fields/defaults';

import { navigate } from '../../navigation/NavReducer'

import HeaderSearch from './HeaderSearch';
import HeaderAddStory from './HeaderAddStory';

function HeaderView(props) {
    const { location, pageRepo } = props
    const { pathname } = location
    
    const paths = pathname.split('/')

    const getPathTitle = (key) => {
        if (boardType[key]) {
            return boardType[key] && boardType[key].label
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
            <HeaderAddStory/>
        </div>
    )
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        navigate,
    }
)(HeaderView)