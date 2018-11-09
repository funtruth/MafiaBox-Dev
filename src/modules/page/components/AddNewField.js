import React from 'react'

class AddNewField extends React.Component{
    render() {
        return (
            <div className="row">
                <div className="page-field-label" style={styles.font}>
                    <i className="story-option ion-md-add" style={{ width: 16 }}></i>
                    Add Field
                </div>
            </div>
        )
    }
}

const styles = {
    font: {
        font: '400 14px Arial'
    }
}

export default AddNewField