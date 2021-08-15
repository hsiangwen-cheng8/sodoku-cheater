import React, {useState} from 'react';
import styles from './GameOverMessage.module.css'
import Modal from 'react-modal';
const GameOverMessage = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        // <div id="overlay" onClick={props.restart}>
        <div className={styles.overlay} onClick={props.restart}>
            <div id="text">You Win!!</div>
        </div>
    );
}

export default GameOverMessage;