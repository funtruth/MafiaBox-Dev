import React, { useState, useEffect} from 'react'
import firebase from 'firebase/app'

import Modal from '../components/Modal'
import ModalOptions from '../components/ModalOptions';

export default function PickCharImage(props) {
    const [images, setImages] = useState([])
    useEffect(() => {
        firebase.database().ref('images').once('value', snap => {
            setImages(snap.val()||[])
        })
    }, [])
    
    return (
        <Modal>
            {images.map(image => (
                <img
                    key={image}
                    className="pick-char-image"
                    src={image}
                    width="200"
                    alt=""
                />
            ))}
            <ModalOptions
                onClose={props.close}
            />
        </Modal>
    )
}