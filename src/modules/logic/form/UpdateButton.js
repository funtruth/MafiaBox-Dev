import React from 'react'
import { connect } from 'react-redux'

import { updateType } from '../types';
import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'
import { deleteProp } from '../../page/PageReducer'

class UpdateButton extends React.Component{
    _onDelete = () => {
        const { pageKey, fieldKey, indexKey, prefix } = this.props
        this.props.deleteProp(pageKey, fieldKey, indexKey, prefix)
    }

    render() {
        const { pageKey, fieldKey, indexKey, config, value, updateSource,
            prefix, vars, pageRepo, showOptions, path, nested } = this.props
        const info = (value.data && value.data[prefix]) || {}

        let buttonText = "", onClick
        switch(info.updateType) {
            case updateType.page:
                buttonText = pageRepo[info.value].title
                break
            case updateType.number:
            case updateType.uid:
            case updateType.variable:
                buttonText = info.value
                break
            case updateType.health:
                //buttonText = updateType[info.value].label.map((item, index) => <i className={item} key={index}/>)
                break
            case updateType.trigger:
                onClick = () => this.props.showModal(modalType.editTrigger, {
                    pageKey,
                    indexKey,
                    fieldKey,
                    subfieldKey: prefix,
                    attach: (value.data && value.data[prefix]) || {},
                    attachVar: vars,
                    path, //WIPneed to update this
                    subpath: [prefix],
                    updateSource,
                })
                buttonText = <i className="mdi mdi-flag"/>
                break
            case updateType.events:
                onClick = () => this.props.showModal(modalType.editEvent, {
                    subfieldKey: prefix,
                    attach: (value.data && value.data[prefix]) || {},
                    attachVar: vars,
                    path,
                    subpath: [prefix],
                    updateSource,
                })
                buttonText = <i className="mdi mdi-calendar"/>
                break
            case updateType.timer:
                buttonText = `${Math.floor(info.value / 60 / 1000)}m${info.value % 60000 / 1000}s`
                break
            default:
        }

        if (info.adjust) {
            buttonText = buttonText.concat(info.adjust)
        }

        //TODO DISGUSTING CODE FIX ASAP
        return (
            <div className="row">
                {buttonText &&
                    (onClick ? <div
                        className="logic-pick-update"
                        highlight="true"
                        onClick={onClick}
                    >
                        {buttonText}
                    </div>
                    :<div
                        className="logic-pick-update app-onclick"
                        menu-type={config.dropdown}
                        highlight="true"
                        app-onclick-props={JSON.stringify({
                            pageKey,
                            indexKey,
                            fieldKey,
                            subfieldKey: prefix,
                            attach: value.data || {},
                            attachVar: vars,
                            path,
                            subpath: [prefix],
                            updateSource,
                        })}
                    >
                        {buttonText}
                    </div>)
                }
                {showOptions && <div className="common-bubble --grey27">
                    {!buttonText && (onClick ? <i
                        className="mdi mdi-plus icon-pop"
                        onClick={onClick}
                        style={{ marginRight: 4 }}
                    />:<i
                        className="mdi mdi-plus icon-pop app-onclick"
                        menu-type={config.dropdown}
                        app-onclick-props={JSON.stringify({
                            pageKey,
                            indexKey,
                            fieldKey,
                            subfieldKey: prefix,
                            attach: value.data || {},
                            attachVar: vars,
                            path,
                            subpath: [prefix],
                            updateSource,
                        })}
                    />)}
                    {nested && <i
                        className="mdi mdi-close icon-pop"
                        onClick={this._onDelete}
                        style={{ marginLeft: 4 }}
                    />}
                </div>}
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
        deleteProp,
    }
)(UpdateButton)