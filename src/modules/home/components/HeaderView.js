import React, { useState } from 'react'
import { connect } from 'react-redux'

import { showModal } from '../../modal/ModalReducer'
import { navigate, goBack } from '../../navigation/NavReducer'
import { addPageToMap } from '../../page/PageReducer'

import { modalType } from '../../modal/types'
import { boardType } from '../../fields/defaults'
import { developType } from '../../navigation/paths'

class HeaderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this._getHeader(props.location.pathname)
        }
    }
    
    componentWillReceiveProps(newProps) {
        if (newProps.location.pathname !== this.props.location.pathname){ 
            this.setState(
                this._getHeader(newProps.location.pathname)
            )
        }
    }

    _getPathTitle(key) {
        if (developType[key]) {
            return developType[key] && developType[key].label
        }
        else {
            return (this.props.pageRepo[key] && this.props.pageRepo[key].title) || 'Untitled'
        }
    }

    _onPathClick = (paths, index) => {
        let newPath = paths.slice(0, index + 1).join('/')
        this.props.navigate(newPath)
    }

    _getHeader(path) {
        let paths = path.split('/')
        let rightBtns = []
        
        switch(paths[1]) {
            case developType.library.key:
                rightBtns = [
                    { key: 'addPage', title: 'New Item', icon: 'ion-ios-add-circle' },
                    { key: 'addStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                    { key: 'editTemplate', boardType: boardType.library.key, title: 'Edit Defaults', icon: 'ion-md-browsers' },
                ]
                break
            case developType.roles.key:
                rightBtns = [
                    { key: 'addPage', title: 'New Item', icon: 'ion-ios-add-circle' },
                    { key: 'addStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                    { key: 'editTemplate', boardType: boardType.roles.key, title: 'Edit Defaults', icon: 'ion-md-browsers' },
                ]
                break
            case developType.phases.key:
                rightBtns = [
                    { key: 'addPage', title: 'New Item', icon: 'ion-ios-add-circle' },
                    { key: 'addStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                    { key: 'editTemplate', boardType: boardType.phases.key, title: 'Edit Defaults', icon: 'ion-md-browsers' },
                ]
                break
            case developType.events.key:
                rightBtns = [
                    { key: 'addPage', title: 'New Item', icon: 'ion-ios-add-circle' },
                    { key: 'addStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                    { key: 'editTemplate', boardType: boardType.events.key, title: 'Edit Defaults', icon: 'ion-md-browsers' },
                ]
                break
            default:
        }

        return {
            mainPath: paths[1],
            childPath: paths[2],
            rightBtns
        }
    }

    _onClick = (item) => {
        const { storyMap } = this.props
        const { key, boardType } = item

        //adds item to first story of board
        let mapKey
        for (var i=0; i<storyMap.length; i++) {
            if (storyMap[i].boardType === this.state.mainPath) {
                mapKey = storyMap[i].key
                break
            }
        }
        
        switch(key) {
            case 'back':
            case 'done':
                return this.props.goBack()
            case 'addPage':
                return this.props.addPageToMap(mapKey, this.state.mainPath)
            case 'addStory':
                return this.props.showModal(modalType.addNewStory, {
                    boardType: this.state.mainPath
                })
            case 'createField':
                return this.props.showModal(modalType.addNewField)
            case 'editTemplate':
                return this.props.showModal(modalType.showTemplate, {
                    boardType
                })
            default:
        }
    }

    _renderItem = (item, index) => {
        return (
            <div
                key={item.key}
                className="row cute-button"
                style={{ marginLeft: index ? 8 : 0 }}
                onClick={this._onClick.bind(this, item)}
            >
                <i className={`option-icon ${item.icon}`}></i>
                {item.title && <div style={{ marginLeft: 6 }}>{item.title}</div>}
            </div>
        )
    }

    _renderPath() {
        const { pathname } = this.props.location
        let paths = pathname.split('/')
        
        return (
            <div className="row" style={{ marginRight: 'auto' }}>
                {paths.map((item, index) => (
                    <div key={index} className="row-centered path-view">
                        {index > 1 ? <div className="path-separator">{'/'}</div>
                        :<div style={{width: 2}}/>}
                        {item && <div className="path-button" onClick={this._onPathClick.bind(this, paths, index)}>
                            {this._getPathTitle(item)}
                        </div>}
                    </div>
                ))}
            </div>
        )
    }

    render() {
        return (
            <div className="header">
                {this._renderPath()}
                {this.state.rightBtns.map(this._renderItem)}
            </div>
        )
    }
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