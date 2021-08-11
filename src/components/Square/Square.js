import React, { useState, useEffect } from 'react';
import styles from './Square.module.css'

const Square = (props) => {

    const potentialValsKeyGenerator = (val) => {
        return props.square.id.toString()+"_"+val.toString();
    }

    const showPotentialVals = () => {
        return (
            props.square.potential_vals.map((enable, i) => {
                if(enable)
                {
                    return(<span key={potentialValsKeyGenerator(i)}>{i+1}</span>)
                }
                else
                {
                    return(<span key={potentialValsKeyGenerator(i)}></span>)
                }
            })
        );
    }
    const showSquare = () => {
        if (props.square.cur_val === 0) {
            if (props.square.enableHighLight === true) {
                return (
                    <div className={styles.PotentialSquareHighLighted} data-x={props.square.row} data-y={props.square.col}>
                        {showPotentialVals()}
                    </div>
                );
            }
            else {
                return (
                    <div className={styles.PotentialSquare} data-x={props.square.row} data-y={props.square.col}>
                        {showPotentialVals()}
                    </div>
                );
            }
        }
        else {
            if (props.square.enableHighLight === true) {
                return (
                    <div className={styles.NormalSquareHighLighted} data-x={props.square.row} data-y={props.square.col}>
                        {props.square.cur_val}
                    </div>
                );
            }
            else {
                return (
                    <div className={styles.NormalSquare} >
                        {props.square.cur_val}
                    </div>
                );
            }
        }
    }

    const handleOnClick = (e) => {
        props.showHighLightWrapper(props.square.id);
    }

    const handleOnKeyDown = (e) => {
        // console.log()
        props.updateSquare(props.square.id, parseInt(e.key))
    }
    return (
        <div className={styles.Square} 
        data-x={props.square.row} 
        data-y={props.square.col}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
        tabIndex={0}>
            {showSquare()}
        </div>
        
    );
}

export default Square;