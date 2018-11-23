import React from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { dropdownType } from '../../app/menu/types'
import { logicTypeInfo, defaultLogic } from './types'

import * as helpers from '../../common/helpers'
import { addItemToRightOf, addItemBelowOf, deleteItem } from '../FieldReducer'

class LogicBlock extends React.Component{
    constructor(props) {
        super(props)
        this.rng = helpers.genUID('rng')
    }

    _addItemRight = (index) => {
        const { field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemToRightOf(index, pageKey, field)
    }

    _addItemBelow = (index) => {
        const { field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.addItemBelowOf(index, pageKey, field)
    }

    _deleteItem = (index) => {
        const { field, pageInfo } = this.props
        const { pageKey } = pageInfo
        
        this.props.deleteItem(index, pageKey, field)
    }

    render() {
        let { field, pageInfo, value, index } = this.props
        if (!pageInfo) return null
        if (!value) {
            value = defaultLogic
        }

        const rows = [index]
        let pointer = value[index] && value[index].down

        while(pointer) {
            if (!value[pointer]) break
            rows.push(pointer)
            pointer = value[pointer].down
        }

        return (
            <Droppable
                droppableId={`CIRCUIT/${pageInfo.pageKey}/${field}/${index}/${this.rng}`}
                type={`ROW/${index}`}
            >
                {(provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                    >
                        {rows.map((item, index) => {
                            if (!value[item]) return null
                            
                            return <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className="row"
                                        key={index}
                                        style={{
                                            marginTop: index ? 8 : 0,
                                            marginBottom: 'auto',
                                        }}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div>
                                            <div className="row">
                                                <i 
                                                    className={`${(value[item].logicType &&
                                                        logicTypeInfo[value[item].logicType].icon) ||
                                                        'ion-md-create'} logic-label menu-onclick`}
                                                    menu-type={dropdownType.showLogic}
                                                    field-key={field}
                                                    index-key={item}
                                                    page-key={pageInfo.pageKey}
                                                    style={{
                                                        backgroundColor: (value[item].logicType &&
                                                            logicTypeInfo[value[item].logicType].color) ||
                                                            '#767676'
                                                    }}
                                                />
                                                <div
                                                    className="logic-button menu-onclick"
                                                    menu-type={dropdownType.showLibrary}
                                                    field-key="phaseTriggerMode"
                                                    index-key={item}
                                                >
                                                    {value[item].title}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <i 
                                                    className={`${index === rows.length - 1 ?
                                                        "ion-ios-add" : "ion-md-arrow-dropdown"} logic-button-down`}
                                                    onClick={this._addItemBelow.bind(this, item)}
                                                />
                                                <div style={{ marginRight: 'auto' }}/>
                                                <i 
                                                    className="ion-md-close logic-button-down menu-onclick"
                                                    menu-type={dropdownType.deleteLogic}
                                                    field-key={field}
                                                    index-key={item}
                                                    page-key={pageInfo.pageKey}
                                                />
                                                <i 
                                                    className="ion-md-expand logic-button-down"
                                                />
                                            </div>
                                        </div> 
                                        <i className="ion-ios-fastforward logic-button-right"
                                            style={{ color: !value[item].right && '#fff' }}
                                            onClick={this._addItemRight.bind(this, item)}
                                        />
                                        {value[item].right && 
                                            <LogicBlock 
                                                {...this.props}
                                                index={value[item].right}
                                            />
                                        }
                                    </div>
                                )}
                            </Draggable>
                        })}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default connect(
    null,
    {
        addItemToRightOf,
        addItemBelowOf,
        deleteItem,
    }
)(LogicBlock)