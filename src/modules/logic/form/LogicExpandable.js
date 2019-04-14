import React from 'react'
import { connect } from 'react-redux'

import { rssMap } from '../types';

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
        const { value, nested, property, prefix } = this.props
        const { showOptions } = this.state
    
        const attributes = proptool.getSubfields(prefix, value.data)
        const isVarField = property.charAt(0) === '$'

        const config = proptool.getUpdateConfig(prefix)
        
        return (
            <div style={{ marginTop: 2, marginLeft: nested ? 12 : 0 }}>
                <div
                    className="row-nowrap"
                    onMouseEnter={this._onMouseEnter}
                    onMouseLeave={this._onMouseLeave}
                >
                    <div
                        className={`common-bubble ${isVarField?'--var':'--grey27'}`}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        {property}
                    </div>
                    <UpdateButton {...this.props} config={config} showOptions={showOptions}/>
                </div>
                {attributes.map((property, index) => (
                    <LogicExpandable
                        {...this.props}
                        nested
                        key={index}
                        property={property.subfield}
                        prefix={prefix + "." + property.subfield}
                    />
                ))}
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