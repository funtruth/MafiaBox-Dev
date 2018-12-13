import React from 'react'
import { connect } from 'react-redux'

import { showModalByKey } from '../modal/ModalReducer'
import { navigate, goBack } from '../navigation/NavReducer'
import { addPageToMap } from '../page/PageReducer'

import { modalType } from '../modal/modalConfig'
import { boardType } from '../board/types'
import { pathKey, pathToLabel } from '../navigation/paths'

class HeaderView extends React.Component{
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
        if (pathToLabel[key]) return pathToLabel[key]
        else return (this.props.roles[key] && this.props.roles[key].roleName) || 'Untitled'
    }

    _onPathClick = (paths, index) => {
        let newPath = paths.slice(0, index + 1).join('/')
        this.props.navigate(newPath)
    }

    _getHeader(path) {
        let paths = path.split('/')
        let leftBtns = [], rightBtns = []
        
        leftBtns = [
            { key: 'back', icon: 'ion-ios-undo' },
        ]
        
        switch(paths[1]) {
            case pathKey.library:
            case pathKey.board:
                rightBtns = [
                    { key: 'addPage', title: 'New Item', icon: 'ion-ios-add-circle' },
                    { key: 'addStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                    { key: 'editTemplate', fieldMapKey: boardType.roles, title: 'Edit Defaults', icon: 'ion-md-browsers' },
                ]
                break
            case pathKey.flow:
                rightBtns = [
                    { key: 'addPage', title: 'New Item', icon: 'ion-ios-add-circle' },
                    { key: 'addStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                    { key: 'editTemplate', fieldMapKey: boardType.flow, title: 'Edit Defaults', icon: 'ion-md-browsers' },
                ]
                break
            case pathKey.events:
                rightBtns = [
                    { key: 'addPage', title: 'New Item', icon: 'ion-ios-add-circle' },
                    { key: 'addStory', title: 'Add a Story', icon: 'ion-md-browsers' },
                    { key: 'editTemplate', fieldMapKey: boardType.events, title: 'Edit Defaults', icon: 'ion-md-browsers' },
                ]
                break
            default:
        }

        return {
            mainPath: paths[1],
            childPath: paths[2],
            leftBtns,
            rightBtns
        }
    }

    _onClick = (item) => {
        const { storyMap } = this.props
        const { key, fieldMapKey } = item

        //adds item to first story of board
        let mapKey
        for (var i=0; i<storyMap.length; i++) {
            if (storyMap[i].boardType === boardType[this.state.mainPath]) {
                mapKey = storyMap[i].key
                break
            }
        }
        
        switch(key) {
            case 'back':
            case 'done':
                return this.props.goBack()
            case 'addPage':
                return this.props.addPageToMap(mapKey, boardType[this.state.mainPath])
            case 'addStory':
                return this.props.showModalByKey(modalType.addNewStory, {
                    boardType: boardType[this.state.mainPath]
                })
            case 'createField':
                return this.props.showModalByKey(modalType.addNewField)
            case 'editTemplate':
                return this.props.showModalByKey(modalType.showTemplate, {
                    fieldMapKey: fieldMapKey
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
            <div className="row header">
                {this.state.leftBtns.map(this._renderItem)}
                {this._renderPath()}
                {this.state.rightBtns.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        storyMap: state.page.storyMap,
    }),
    {
        addPageToMap,
        showModalByKey,
        navigate,
        goBack,
    }
)(HeaderView)