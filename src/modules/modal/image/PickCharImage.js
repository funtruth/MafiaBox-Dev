import React, { useState, useEffect} from 'react'
import firebase from 'firebase/app'

import ModalOptions from '../components/ModalOptions';
import Body from '../../components/Body';

export default function PickCharImage(props) {
    const [images, setImages] = useState([])
    useEffect(() => {
        firebase.database().ref('images').once('value', snap => {
            setImages(snap.val()||[])
        })
    }, [])
    
    return (
        <Body>
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
        </Body>
    )
}