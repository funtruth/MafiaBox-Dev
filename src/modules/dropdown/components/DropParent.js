import React from 'react'
import * as helpers from '../../common/helpers'

class DropParent extends React.Component{
    constructor(props) {
        super(props)
        this.myDiv = null
        this.parent = null
        this.state = {
            origin: false,
        }
    }

    componentDidMount() {
        if (this.myDiv) {
            this.parent = helpers.getDropdownParentTarget(this.myDiv)
            this.parent.addEventListener('mouseenter', this._handleOrigin)
        }
    }

    componentWillUnmount() {
        if (this.parent) {
            this.parent.removeEventListener('mouseenter', this._handleOrigin)
        }
    }

    _handleOrigin = () => {
        this.setState({
            origin: false,
        })
    }

    _onMouseOver = e => {
        const { dropdownType, params } = this.props
        if (!dropdownType) return

        this.props.showDropdown(dropdownType, e, params)
        this.setState({
            origin: true,
        })
    }

    _onMouseOut = e => {
        if (e.nativeEvent.offsetX < e.target.offsetWidth) {
            this.props.popDropdownTo()
            this.setState({
                origin: false,
            })
        }
    }

    render() {
        const { icon, text, chosen, style } = this.props
        const { origin } = this.state
        
        return (
            <div
                ref={ref => this.myDiv = ref}
                className="drop-down-menu-option"
                chosen={chosen ? chosen.toString() : undefined}
                origin={origin.toString()}
                onMouseOver={this._onMouseOver}
                onMouseOut={this._onMouseOut}
                style={style}
            >
                {icon && <i className={`drop-down-menu-icon ${icon}`}></i>}
                {text || 'Parent'}
                <i className="mdi mdi-play"/>
            </div>
        )
    }
}

export default DropParent