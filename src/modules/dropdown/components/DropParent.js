import React from 'react'

class DropParent extends React.Component{
    _onMouseOver = e => {
        const { dropdownType, params } = this.props
        if (!dropdownType) return
        this.props.showDropdown(dropdownType, e, params)
    }

    _onMouseOut = e => {
        if (e.nativeEvent.offsetX < e.target.offsetWidth) {
            this.props.popDropdownTo()
        }
    }

    render() {
        const { icon, text, chosen } = this.props
        
        return (
            <div
                className="drop-down-menu-option"
                chosen={chosen ? chosen.toString() : undefined}
                onMouseOver={this._onMouseOver}
                onMouseOut={this._onMouseOut}
            >
                {icon && <i className={`drop-down-menu-icon ${icon}`}></i>}
                {text || 'Parent'}
                <i className="mdi mdi-play"/>
            </div>
        )
    }
}

export default DropParent