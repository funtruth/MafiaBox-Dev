import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import { modalType } from '../../modal/types'
import { updateSourceType } from '../../common/types';
import { dropdownType } from '../../dropdown/types'
import { boardType } from '../../fields/defaults';

import { showModal } from '../../modal/ModalReducer'
import { addFunction } from '../../functions/FunctionReducer'

class FunctionList extends React.Component{
    _onAdd = (itemCount) => {
        const { item } = this.props
        this.props.addFunction(item.key, itemCount, boardType.functions.key)
    }

    _onClick = (item) => {
        if (!this.props.dragging) {
            this.props.showModal(modalType.showFunctionPage, {
                pageKey: item.pageKey,
                path: [item.pageKey],
                updateSource: updateSourceType.function,
            })
        }
    }

    render() {  
        const { item, index, repo } = this.props

        const filteredRepo = _.filter(repo, i => i.storyType === item.key)
        
        const itemCount = filteredRepo.length
        const isEmpty = filteredRepo.length === 0

        return (
            <div>
                <div className="story-title">
                    <div className={`${item.palette || "black-grey"} story-label`}>
                        {item.title}
                    </div>
                    <div
                        className="story-option app-onclick"
                        menu-type={dropdownType.storyShowMore}
                        app-onclick-props={JSON.stringify({
                            fieldKey: index,
                        })}
                    >
                        <i
                            className="ion-ios-more"
                            style={{
                                fontSize: 16,
                            }}
                        ></i>
                    </div>
                    <div
                        className="story-option"
                        onClick={this._onAdd.bind(this, itemCount)}
                    >
                        <i
                            className="ion-ios-add"
                            style={{
                                fontSize: 19,
                            }}
                        ></i>
                    </div>
                    
                </div>
                <div className="story=list">
                    {isEmpty?
                        <div className="story-empty">There is nothing here yet</div>
                        :filteredRepo.map((item, index) => (
                            <div
                                key={item.pageKey}
                                className="story-tag"
                                onClick={this._onClick.bind(this, item)}
                                style={{
                                    cursor: 'pointer',
                                    marginBottom: 8,
                                }}
                            >
                                {item.title || 'Untitled'}
                            </div>
                        ))
                    }
                </div>
            </div>
                
        )
    }
}

export default connect(
    null,
    {
        showModal,
        addFunction,
    }
)(FunctionList)