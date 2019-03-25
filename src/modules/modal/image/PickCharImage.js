import React, { useState, useEffect} from 'react'
import firebase from 'firebase/app'

import Modal from '../components/Modal'
import ModalOptions from '../components/ModalOptions';

function PickCharImage(props) {

    const [images, setImages] = useState({})
    useEffect(() => {
        firebase.storage().ref('chars/Thug.jpg').getDownloadURL().then(url => {
            setImages(url)
        })
    }, [])
    
    return (
        <Modal>
            <img className="pick-char-image" src={images} width="200"/>
            <ModalOptions
                onClose={props.close}
            />
        </Modal>
    )
}

export default PickCharImage