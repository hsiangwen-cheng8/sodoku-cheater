import React, { useState, useEffect } from 'react';
import styles from './Board.module.css'
import Square from '../Square/Square';
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@material-ui/icons/BorderColor';
class SudokuCell {
    constructor(row, col, area, id, cur_val = 0,
        potential_vals = [true, true, true, true, true, true, true, true, true],
        enableHighLight = false, showError = false) {
        this.cur_val = cur_val;
        this.potential_vals = potential_vals;
        this.enableHighLight = enableHighLight;
        this.row = row;
        this.col = col;
        this.area = area;
        this.id = id;
        this.showError = showError;
    }
};

class Operation {
    /**
     * 
     * @param {string} action setCurVal, setPotentialVal 
     * @param {int} val 
     * @param {int} squareID 
     * @param {int} stepsID not unique, use to track steps
     */
    constructor(action, val, squareID, stepsID, pre_val) {
        this.action = action;
        this.val = val;
        this.squareID = squareID;
        this.stepsID = stepsID;
        this.pre_val = pre_val;
    }
};

const Board = () => {
    const [Squares, setSquares] = useState([]);
    const [Operations, setOperations] = useState([]);
    const [OperationsID, setOperationsID] = useState(0);
    const [pencilMode, setPencilMode] = useState(false);

    const getArea = (row, col) => {
        if (row < 3 && col < 3)
            return 1;
        else if (row >= 3 && row < 6 && col < 3)
            return 4;
        else if (row >= 6 && col < 3)
            return 7;
        else if (row < 3 && col >= 3 && col < 6)
            return 2;
        else if (row >= 3 && row < 6 && col >= 3 && col < 6)
            return 5;
        else if (row >= 6 && col >= 3 && col < 6)
            return 8;
        else if (row < 3 && col >= 6)
            return 3;
        else if (row >= 3 && row < 6 && col >= 6)
            return 6;
        else if (row >= 6 && col >= 6)
            return 9;
    }

    const initSquares = () => {
        for (let i = 0; i < 9; ++i) {
            for (let j = 0; j < 9; ++j) {
                let tmp_sqaure = new SudokuCell(i, j, getArea(i, j), i * 9 + j);
                setSquares(squares => [...squares, tmp_sqaure])
            }
        }
    }

    const updateSquare = (id, val, mode = -1) => {
        let square = Squares[id];
        let pre_val = square.cur_val;
        let potentialValsUpdated = false;
        // Set potential vals
        if (square.cur_val === 0 && pencilMode === true) {
            square.potential_vals[val - 1] = !square.potential_vals[val - 1];
            let operation = new Operation('setPotentialVal', val, id, OperationsID, pre_val);
            setOperations(operations => [...operations, operation]);
            setOperationsID(OperationsID+1);
        }
        // square in pencil mode. set the value
        else if (square.cur_val === 0 && pencilMode === false) {
            square.cur_val = val;
            potentialValsUpdated = true;
        }
        // square in active mode. set the value
        else if (square.cur_val > 0 && pencilMode === false) {
            square.cur_val = val;
            potentialValsUpdated = true;
        }
        // square in active mode. set square back to pencil mode and adjust the value in
        // potential vals
        else {
            square.cur_val = 0;
            let operation = new Operation('setCurVal', 0, id, OperationsID, pre_val);
            setOperations(operations => [...operations, operation]);
            square.potential_vals[val - 1] = true;
            operation = new Operation('setPotentialVal', val, id, OperationsID, pre_val);
            setOperations(operations => [...operations, operation]);
            setOperationsID(OperationsID+2);
        }
        if (potentialValsUpdated) {
            setSquares(
                Squares.map(s => {
                    let newSquare = s;
                    if (s.id == square.id) {
                        let operation = new Operation('setPotentialVal', val, newSquare.id, OperationsID, s.cur_val);
                        setOperations(operations => [...operations, operation]);
                        let operation2 = new Operation('setCurVal', val, newSquare.id, OperationsID, s.cur_val);
                        setOperations(operations => [...operations, operation2]);
                        setOperationsID(OperationsID+2);
                        return square;
                    }
                    else if (s.row === square.row || s.col === square.col || s.area === square.area) {
                        newSquare.potential_vals[val - 1] = false;
                        let operation = new Operation('setPotentialVal', val, newSquare.id, OperationsID, s.cur_val);
                        setOperations(operations => [...operations, operation]);
                        setOperationsID(OperationsID+1);
                        return newSquare;
                    }
                    else
                        return s;
                })
            )
        }
        else {
            setSquares(
                Squares.map(s => s.id === square.id ? square : s)
            )
        }

    }

    const showHighLight = (board, row, col, area) => {
        for (let i = 0; i < board.length; ++i) {
            if (board[i].row === row || board[i].col === col || board[i].area === area) {
                board[i].enableHighLight = true;
            }
        }
        return board;
    }

    const showHighLightWrapper = (id) => {
        let targetSquare = Squares[id];
        let newBoard = [...Squares];
        for (let i = 0; i < newBoard.length; ++i) {
            newBoard[i].enableHighLight = false;
        }
        newBoard = showHighLight(newBoard, targetSquare.row, targetSquare.col, targetSquare.area);
        if (targetSquare.cur_val !== 0) {
            for (let i = 0; i < newBoard.length; ++i) {
                if (newBoard[i].cur_val === targetSquare.cur_val) {
                    newBoard = showHighLight(newBoard, newBoard[i].row, newBoard[i].col, newBoard[i].area);
                }
            }
        }

        setSquares(newBoard);
    }

    const updatePencilMode = (e) => {
        setPencilMode(!pencilMode);
    }

    const reverseOperation = (e) => {
        let operations = [...Operations];
        let operation = operations[operations.length];
        let index = operations.length;
        let stepID = operation.stepsID;
        while(index >= 0 && operations[index].stepsID == stepID){
            if (operation.action === 'setCurVal') {
                updateSquare(operation.squareID, operation.pre_val);
            }
            --index;
        }
        //     const name = e.target.getAttribute("name")
        //      updateList(list.filter(item => item.name !== name));
    };

    useEffect(() => {
        initSquares();
    }, []);

    return (
        <div className={styles.Board}>
            <div></div>
            <div className={styles.Container}>
                {Squares.map(square =>
                    <Square
                        key={square.row * 9 + square.col}
                        square={square}
                        updateSquare={updateSquare}
                        showHighLightWrapper={showHighLightWrapper}
                    />
                )}
            </div>
            <div>
                {pencilMode ?
                    <IconButton color='primary' onClick={updatePencilMode}>
                        <BorderColorIcon />
                    </IconButton>
                    :
                    <IconButton onClick={updatePencilMode}>
                        <BorderColorIcon />
                    </IconButton>}

            </div>
        </div>
    );
}

export default Board;