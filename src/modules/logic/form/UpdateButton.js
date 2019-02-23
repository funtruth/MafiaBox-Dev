import React from 'react'
import { connect } from 'react-redux'

import { updateSourceType } from '../../common/types';
import { updateType, updateViewType } from '../types';
import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'
import { deleteProp } from '../../page/PageReducer'

class UpdateButton extends React.Component{
    _onDelete = () => {
        const { pageKey, fieldKey, indexKey, prefix } = this.props
        this.props.deleteProp(pageKey, fieldKey, indexKey, prefix)
    }

    render() {
        const { pageKey, fieldKey, indexKey, config, logicInfo, prefix, vars, pageRepo, showOptions, path, nested } = this.props
        const info = (logicInfo.data && logicInfo.data[prefix]) || {}

        let buttonText = "", onClick
        switch(info.updateViewType) {
            case updateViewType.page:
                buttonText = pageRepo[info.value].title
                break
            case updateViewType.number:
            case updateViewType.uid:
            case updateViewType.variable:
                buttonText = info.value
                break
            case updateViewType.dynamicVal:
            case updateViewType.staticVal:
                buttonText = updateType[info.value].title
                break
            case updateViewType.health:
                buttonText = updateType[info.value].label.map((item, index) => <i className={item} key={index}/>)
                break
            case updateViewType.trigger:
                onClick = () => this.props.showModal(modalType.editTrigger, {
                    pageKey,
                    indexKey,
                    fieldKey,
                    subfieldKey: prefix,
                    attach: (logicInfo.data && logicInfo.data[prefix]) || {},
                    attachVar: vars,
                    isTrigger: true,
                    updateSource: updateSourceType.topModal,
                })
                buttonText = <i className="mdi mdi-flag"/>
                break
            case updateViewType.events:
                onClick = () => this.props.showModal(modalType.editEvent, {
                    pageKey,
                    indexKey,
                    fieldKey,
                    subfieldKey: prefix,
                    attach: (logicInfo.data && logicInfo.data[prefix]) || {},
                    attachVar: vars,
                    updateSource: updateSourceType.topModal,
                })
                buttonText = <i className="mdi mdi-calendar"/>
                break
            case updateViewType.timer:
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
                            attach: logicInfo.data || {},
                            attachVar: vars,
                            path,
                            subpath: [prefix],
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
                            attach: logicInfo.data || {},
                            attachVar: vars,
                            path,
                            subpath: [prefix],
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