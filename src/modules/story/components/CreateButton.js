import React from 'react'
import { Link } from 'react-router-dom'

class CreateButton extends React.Component{
    render() {
        return (
            <Link to="/home/edit">
                <div className="footer">
                    <i class="add-role-icon ion-md-person-add"></i>
                    {'Create a New Role'}
                </div>
            </Link>
        )
    }
}

export default CreateButton