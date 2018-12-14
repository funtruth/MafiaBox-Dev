import React from 'react'

class LogicExpandable extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
        }
    }

    _toggleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        const { item, room } = this.props
        const { collapsed } = this.state
        const hasChildren = typeof room === 'object'

        return (
            <div
                className="logic-form-label"
                style={{
                    marginTop: 2,
                }}
            >
                <div className="row">
                    {item}
                    {hasChildren &&
                        <i 
                            className={collapsed ? "ion-md-arrow-dropdown" : "ion-md-arrow-dropup"}
                            data-tip={collapsed ? "Expand" : "Collapse"}
                            onClick={this._toggleCollapse}
                            style={{
                                marginLeft: 'auto',
                                width: 15,
                            }}
                        />
                    }
                </div>
                {!collapsed && hasChildren &&
                    Object.keys(room).map((item, index) => (
                        <LogicExpandable {...this.props} key={index} item={item} room={room[item]}/>
                    ))
                }
            </div>
        )
    }
}

export default LogicExpandable