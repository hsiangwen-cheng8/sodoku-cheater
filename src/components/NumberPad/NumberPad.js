import React from 'react';
import styles from './NumberPad.module.css'
import Button from '@material-ui/core/Button';
const NumberPad = (props) => {

    const onClickNumberPad = () =>
    {
        props.updateSquare(props.selectedSquareID, props.val);
    }

    return (
        <Button m="2rem" className={styles.button} onClick={onClickNumberPad} variant="contained">{props.val}</Button>
    );
}

export default NumberPad;