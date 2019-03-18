import React from 'react'
import './Header.css'
import { connect } from 'react-redux'

import { showModal } from '../../modal/ModalReducer'
import { navigate, goBack } from '../../navigation/NavReducer'
import { addPageToMap } from '../../page/PageReducer'

import { modalType } from '../../modal/types'
import { developType } from '../../navigation/paths'

import HeaderSearch from './HeaderSearch';
import HeaderAddItem from './HeaderAddItem';
import HeaderAddStory from './HeaderAddStory';

function HeaderView(props) {
    const { location, pageRepo, storyMap } = props
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

    const onClick = (item) => {
        const { key, boardType } = item

        //adds item to first story of board
        let mapKey
        
        switch(key) {
            case 'back':
            case 'done':
                return props.goBack()
            case 'addPage':
                return props.addPageToMap(mapKey)
            case 'addStory':
                return props.showModal(modalType.addNewStory, {
                })
            case 'createField':
                return props.showModal(modalType.addNewField)
            case 'editTemplate':
                return props.showModal(modalType.showTemplate, {
                    boardType
                })
            default:
        }
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
            {addStory && <HeaderAddStory/>}
        </div>
    )
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
        pageRepo: state.page.pageRepo,
    }),
    {
        addPageToMap,
        showModal,
        navigate,
        goBack,
    }
)(HeaderView)