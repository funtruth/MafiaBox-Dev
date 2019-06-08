import React, { useState, useEffect} from 'react'
import _ from 'lodash'
import firebase from 'firebase/app'

import ModalOptions from '../components/ModalOptions';
import { Body, DropClick, Row } from '../../components/Common';

export default function PickSprite({update, showModal}) {
    const [images, setImages] = useState([])
    useEffect(() => {
        firebase.database().ref('images')
            .once('value', snap => setImages(_.toArray(snap.val())))
    }, [])
    
    const handleSelect = (image) => {
        update(image)
        showModal();
    }

    return (
        <Body
            style={{
                height: '80vh',
                width: '75vw',
            }}
        >
            <Row x="c" style={{overflow: 'auto'}}>
                {images.map(image => (
                    <DropClick
                        key={image}
                        onClick={() => handleSelect(image)}
                    >
                        <div
                            style={{
                                width: 150,
                                height: 200,
                                margin: 12,
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </DropClick>
                ))}
            </Row>
            <ModalOptions/>
        </Body>
    )
}