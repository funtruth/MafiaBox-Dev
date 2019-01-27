import React from 'react'
import { connect } from 'react-redux'

import { updateType, updateViewType } from '../types';
import { modalType } from '../../modal/types'

import { showModal } from '../../modal/ModalReducer'

class UpdateButton extends React.Component{
    render() {
        const { pageKey, fieldKey, indexKey, config, logicInfo, prefix, vars, pageRepo } = this.props
        const info = (logicInfo.data && logicInfo.data[prefix]) || {}
        
        let buttonText = "", onClick
        switch(info.updateViewType) {
            case updateViewType.page:
                buttonText = pageRepo[info.value].title
                break
            case updateViewType.uid:
                buttonText = info.value
                break
            case updateViewType.staticVal:
                buttonText = updateType[info.value].title
                break
            case updateViewType.dynamicVal:
                buttonText = `${updateType[info.value].title} ${info.dynamic}`
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
                    attachVar,
                    isTrigger: true,
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
                    attachVar,
                })
                buttonText = <i className="mdi mdi-calendar"/>
                break
            case updateViewType.timer:
                buttonText = `${Math.floor(info.value / 60 / 1000)}m${info.value % 60000 / 1000}s`
                break
            default:
                buttonText = <div style={{ color: '#767676' }}>{config.action}</div>
        }

        const attach = logicInfo.data || {}
        const attachVar = vars

        if (onClick) {
            return (
                <div
                    className="logic-pick-update"
                    highlight="true"
                    onClick={onClick}
                >
                    {buttonText}
                </div>
            )
        }
        
        return (
            <div
                className="logic-pick-update app-onclick"
                menu-type={config.dropdown}
                highlight="true"
                app-onclick-props={JSON.stringify({
                    pageKey,
                    indexKey,
                    fieldKey,
                    subfieldKey: prefix,
                    attach,
                    attachVar,
                })}
            >
                {buttonText}
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
    }
)(UpdateButton)