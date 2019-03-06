import React from 'react'
import PageView from '../../page/PageView'
import Modal from '../components/Modal';

export default function PageModal(props) {
    return (
        <Modal>
            <div
                style={{
                    minHeight: 400,
                    minWidth: 600,
                    height: '80vh',
                    width: '65vw',
                    overflow: 'scroll',
                }}
            >
                <PageView {...props}/>
            </div>
        </Modal>
    )
}