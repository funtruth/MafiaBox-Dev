import React from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { dropdownType } from '../../app/menu/types'
import { logicTypeInfo, defaultLogic } from './types'

import * as helpers from '../../common/helpers'
import * as maptool from './maptool'
import { addItemToRightOf, addItemBelowOf, deleteItem, toggleCollapse } from '../FieldReducer'

import LoginErrors from './LogicErrors'

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

    _toggleCollapse = (index) => {
        const { field, pageInfo } = this.props
        const { pageKey } = pageInfo

        this.props.toggleCollapse(index, pageKey, field)
    }

    render() {
        let { field, pageInfo, value, index, pageRepo } = this.props
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

                            const hasPage = pageRepo[value[item].pageKey]
                            const errors = maptool.compile(item, value)
                            const collapsed = value[item].collapsed
                            
                            return <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className="row-nowrap"
                                        key={index}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            marginTop: index ? 10 : 0,
                                            marginBottom: 'auto',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <div>
                                            <div className="row-nowrap">
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
                                                            '#767676',
                                                        color: '#fff',
                                                    }}
                                                />
                                                <div
                                                    className="logic-button menu-onclick"
                                                    menu-type={dropdownType.showLibrary}
                                                    field-key={field}
                                                    index-key={item}
                                                    page-key={pageInfo.pageKey}
                                                    style={{ color: hasPage ? '#fff' : '#868686' }}
                                                >
                                                    {hasPage ? 
                                                        pageRepo[value[item].pageKey].title
                                                        :'Empty'
                                                    }
                                                </div>
                                            </div>
                                            <div className="row" style={{ textAlign: 'center' }}>
                                                <i 
                                                    className="ion-md-arrow-dropdown logic-button-down"
                                                    data-tip="Add another operator."
                                                    onClick={this._addItemBelow.bind(this, item)}
                                                />
                                                <LoginErrors errors={errors}/>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <i 
                                                className="ion-md-close logic-option menu-onclick"
                                                menu-type={dropdownType.deleteLogic}
                                                field-key={field}
                                                index-key={item}
                                                page-key={pageInfo.pageKey}
                                            />
                                            <i 
                                                className={`${collapsed ? "ion-md-expand" : "ion-md-contract"} logic-option`}
                                                data-tip={collapsed ? "Expand." : "Collapse"}
                                                onClick={this._toggleCollapse.bind(this, item)}
                                            />
                                        </div>
                                        <i
                                            className="ion-ios-fastforward logic-button-right"
                                            data-tip="Add another operator."
                                            onClick={this._addItemRight.bind(this, item)}
                                        />
                                        {!collapsed && value[item].right && 
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
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        addItemToRightOf,
        addItemBelowOf,
        deleteItem,
        toggleCollapse,
    }
)(LogicBlock)