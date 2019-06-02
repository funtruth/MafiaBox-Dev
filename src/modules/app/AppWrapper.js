import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

import { showModal } from '../modal/ModalReducer'
import { showDropdown } from '../dropdown/DropdownReducer'

import AuthWrapper from '../auth/AuthWrapper'

function AppWrapper({children}) {
    const dispatch = useDispatch();

    useEffect(() => {
        const hide = (e) => {
            if (e.target.classList && e.target.classList.contains('drop-down-pause')) {
                dispatch(showDropdown())
            } else if (e.target.classList && e.target.classList.contains('modal-appclick')) {
                dispatch(showModal())
            }
        }

        window.addEventListener('mouseup', hide)
        return () => {
            window.removeEventListener('mouseup', hide)
        }
    }, [])

    return (
        <AuthWrapper>
            {children}
        </AuthWrapper>
    )
}

export default DragDropContext(HTML5Backend)(AppWrapper)