import React from 'react'
import './Header.css'
import '../../board/board.css'
import { useDispatch } from 'react-redux'

import { navigate } from '../../app/NavReducer'

import HeaderSearch from './HeaderSearch';
import HeaderAddStory from './HeaderAddStory';
import { Row } from '../../components/Common'

export default function HeaderView(props) {
    const dispatch = useDispatch();

    const { location } = props
    const { pathname } = location
    
    const paths = pathname.split('/')

    const onPathClick = (index) => {
        let newPath = paths.slice(0, index + 1).join('/')
        dispatch(navigate(newPath))
    }

    return (
        <div className="header">
            <Row style={{marginRight: 'auto'}}>
                {paths.map((item, index) => (
                    <div key={index} className="row-centered path-view">
                        {index > 1 ?
                            <div className="path-separator">/</div>
                            :<div style={{width: 2}}/>
                        }
                        {item &&
                            <div className="path-button"
                                onClick={() => onPathClick(index)}
                            >
                                {item}
                            </div>
                        }
                    </div>
                ))}
            </Row>
            <HeaderSearch/>
            <HeaderAddStory/>
        </div>
    )
}