import React from 'react'
import './Header.css'
import '../../board/board.css'
import { useDispatch } from 'react-redux'

import { navigate } from '../../app/NavReducer'
import { addStory } from '../../page/PageReducer'

import HeaderSearch from './HeaderSearch';
import { Row, Tag } from '../../components/Common'

export default function HeaderView(props) {
    const dispatch = useDispatch();

    const { location } = props
    const { pathname } = location
    
    const paths = pathname.split('/')

    const onPathClick = (index) => {
        let newPath = paths.slice(0, index + 1).join('/')
        dispatch(navigate(newPath))
    }

    const handleAdd = () => {
        dispatch(addStory())
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
            <Tag
                onClick={handleAdd}
                icon="mdi mdi-table-plus"
                text="New Patch"
            />
        </div>
    )
}