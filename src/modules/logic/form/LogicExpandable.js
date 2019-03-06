import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../proptool'

import { updateRepo } from '../../page/PageReducer'
import { updateTopModal } from '../../modal/ModalReducer'
import UpdateButton from './UpdateButton'

class LogicExpandable extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            showOptions: false,
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.dropdownKeys.length === 0) {
            this.setState({
                showOptions: false,
            })
        }
    }

    _toggle = () => {
        const { pageKey, fieldKey, indexKey, subfieldKey, value, prefix } = this.props
        
        if (subfieldKey) {
            this.props.updateTopModal(
                ['attach', 'value', prefix],
                {
                    hide: !value.data || !value.data[prefix] || !value.data[prefix].hide,
                }
            )
        } else {
            this.props.updateRepo(
                [pageKey, fieldKey, indexKey, 'data', prefix],
                {
                    hide: !value.data || !value.data[prefix] || !value.data[prefix].hide
                }
            )
        }
    }

    _onMouseEnter = () => {
        const { dropdownKeys } = this.props
        if (dropdownKeys.length === 0) {
            this.setState({
                showOptions: true,
            })
        }
    }

    _onMouseLeave = () => {
        const { dropdownKeys } = this.props
        if (dropdownKeys.length === 0) {
            this.setState({
                showOptions: false,
            })
        }
    }

    render() {
        const { value, nested, property, updateRef, prefix } = this.props
        const { showOptions } = this.state
    
        const hidden = value.data && value.data[prefix] && value.data[prefix].hide
        const attributes = proptool.getSubfields(prefix, value.data)
        const hasAttr = attributes.length > 0
        const isVarField = property.charAt(0) === '$'

        const config = proptool.getUpdateConfig(prefix, updateRef)
        
        return (
            <div style={{ marginTop: 2, marginLeft: nested ? 12 : 0 }}>
                <div
                    className="row-nowrap"
                    onMouseEnter={this._onMouseEnter}
                    onMouseLeave={this._onMouseLeave}
                >
                    {hasAttr ? 
                        <div
                            className="common-bubble"
                            onClick={this._toggle}
                        >
                            <i className={hidden ? "mdi mdi-plus-box" : "mdi mdi-minus-box"}/>
                        </div>
                        :<i
                            className="mdi mdi-plus-box common-bubble"
                            style={{ opacity: 0 }}
                        />
                    }
                    <div
                        className={`common-bubble ${isVarField?'--var':'--grey27'}`}
                        onClick={this._toggle}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        {property}
                    </div>
                    <UpdateButton {...this.props} config={config} showOptions={showOptions}/>
                </div>
                {!hidden &&
                    attributes.map((property, index) => (
                        <LogicExpandable
                            {...this.props}
                            nested
                            key={index}
                            property={property.subfield}
                            prefix={prefix + "." + property.subfield}
                        />
                    ))
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownKeys: state.dropdown.dropdownKeys,
    }),
    {
        updateRepo,
        updateTopModal,
    }
)(LogicExpandable)