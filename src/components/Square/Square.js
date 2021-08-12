import React from 'react';
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
            return (
                <div className={styles.PotentialSquare} data-x={props.square.row} data-y={props.square.col}>
                    {showPotentialVals()}
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

    const changeSquareBackground = () => {
        if(props.square.showError === true)
        {
            return '#d91818';
        }
        if(props.selectedSquareID === props.square.id)
            return '#5797ff';
        else if(props.square.enableHighLight === 1)
            return '#477acc';
        // else if(props.square.cur_val !== 0)
        //     return '#3289a8';
        else if(props.square.enableHighLight === 2)
            return '#BBDEFB';
        else if(props.square.enableHighLight === 3)
            return '#E2EBF3';
        
        
            
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
        tabIndex={0}
        style={{backgroundColor: changeSquareBackground()}}>
            {showSquare()}
        </div>
        
    );
}

export default Square;