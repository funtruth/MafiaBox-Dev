import React from 'react'
import PageView from '../../page/PageView'
import Modal from '../components/Modal';

class PageModal extends React.Component {
    render() {
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
                    <PageView {...this.props}/>
                </div>
            </Modal>
        )
    }
}

export default PageModal