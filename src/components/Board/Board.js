import React, { useState, useEffect } from 'react';
import styles from './Board.module.css'
import Square from '../Square/Square';
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import RestoreIcon from '@material-ui/icons/Restore';
import ClearIcon from '@material-ui/icons/Clear';
import NumberPad from '../NumberPad/NumberPad';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import GameOverMessage from '../GameOverMessage/GameOverMessage';
class SudokuCell {
    constructor(row, col, area, id, cur_val = 0,
        potential_vals = [true, true, true, true, true, true, true, true, true],
        enableHighLight = 0, showError = false) {
        this.cur_val = cur_val;
        this.potential_vals = potential_vals;
        /**
         * 0 = no highlight
         * 1 = primary highlight where square.cur_val = selected_sqaure.cur_val
         * 2 = secondary highlight where square.potential_val[val-1] === true
         * 3 = for square in same row, col, area as selected square
         * 4 = error
         */
        this.enableHighLight = enableHighLight;
        this.row = row;
        this.col = col;
        this.area = area;
        this.id = id;
        this.showError = showError;
        this.editable = true;
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

class backgroundEnum {
    constructor() {
        this.selectedSquare = 0;
        // cur_val = select.cur_val
        this.complementSelectedSquare = 1;
        // potential_vals has select.cur_val
        this.potentialVals = 2;
        this.sameAreaSelectedSquare = 3;
    }
}

const Board = (props) => {
    const [Answers, setAnswers] = useState([]);
    const [Squares, setSquares] = useState([]);
    const [Operations, setOperations] = useState([]);
    const [OperationsID, setOperationsID] = useState(0);
    const [pencilMode, setPencilMode] = useState(false);
    const [hadError, setHadError] = useState(false);
    const [selectedSquareID, setselectedSquareID] = useState(-1);

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

    const checkGameOver = () => {
        for (let i = 0; i < Squares.length; ++i) {
            if (Squares[i].cur_val == 0) {
                return;
            }
        }
        if (!hadError) {
            console.log('game over')
            props.setGameOver(true);
            let temp_squares = [...Squares];
            for (let i = 0; i < temp_squares.length; ++i) {
                temp_squares[i].editable = false;
            }
            setSquares(temp_squares);
        }
    }

    const findError = () => {
        let temp_squares = [...Squares];
        for (let i = 0; i < Squares.length; ++i) {
            temp_squares[i].showError = false;
        }
        let foundErrorAll = false;
        for (let i = 0; i < Squares.length; ++i) {
            let target_square = temp_squares[i];
            temp_squares.map((square) => {
                let found_error = false;
                if (square.id !== target_square.id && square.cur_val === target_square.cur_val && target_square.cur_val !== 0) {
                    if (square.row === target_square.row || square.col === target_square.col || square.area === target_square.area) {
                        found_error = true;
                        square.showError = true;
                        target_square.showError = true;
                        foundErrorAll = true;
                    }
                    if(Answers.length > 0 && square.cur_val != Answers[i])
                    {
                        // console.log('found error aganist solution')
                        found_error = true;
                        target_square.showError = true;
                        foundErrorAll = true;
                    }
                }
                if (!found_error && square.showError === false) {
                    square.showError = false;
                }
                return square;
            })
        }
        setSquares(temp_squares);
        if (foundErrorAll) {
            setHadError(true);
        }
        else {
            setHadError(false);
        }
    }

    const initSquares = () => {
        let newBoard = [];
        for (let i = 0; i < 9; ++i) {
            for (let j = 0; j < 9; ++j) {
                let tmp_sqaure = new SudokuCell(i, j, getArea(i, j), i * 9 + j);
                newBoard.push(tmp_sqaure);
            }
        }
        setSquares(newBoard);
    }

    const updateSquare = (id, val, mode = -1) => {
        if (id === -1) {
            showHighLightWithSelectedVal(val);
            return;
        }
        if (Squares[id].editable === false) return;
        let square = Squares[id];
        let pre_val = square.cur_val;
        let potentialValsUpdated = false;
        // Set potential vals
        if ((square.cur_val === 0 && pencilMode === true) || mode === 1) {
            square.potential_vals[val - 1] = !square.potential_vals[val - 1];
            let operation = new Operation('setPotentialVal', val, id, OperationsID, pre_val);
            if (mode === -1) {
                setOperations(operations => [...operations, operation]);
                setOperationsID(OperationsID + 1);
            }
        }
        // square in pencil mode. set the value
        else if ((square.cur_val === 0 && pencilMode === false) || mode === 2) {
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
            if (mode === -1) {
                let operation = new Operation('setCurVal', 0, id, OperationsID, pre_val);
                setOperations(operations => [...operations, operation]);
            }
            square.potential_vals[val - 1] = true;
            if (mode === -1) {
                let operation = new Operation('setPotentialVal', val, id, OperationsID, pre_val);
                setOperations(operations => [...operations, operation]);
                setOperationsID(OperationsID + 2);
            }
        }
        if (potentialValsUpdated) {
            setSquares(
                Squares.map(s => {
                    let newSquare = s;
                    if (s.id === square.id) {
                        if (mode === -1) {
                            // let operation = new Operation('setPotentialVal', val, newSquare.id, OperationsID, pre_val);
                            // setOperations(operations => [...operations, operation]);
                            let operation2 = new Operation('setCurVal', val, newSquare.id, OperationsID, pre_val);
                            setOperations(operations => [...operations, operation2]);
                            // setOperationsID(OperationsID + 2);
                            setOperationsID(OperationsID + 1);
                        }
                        return square;
                    }
                    else if ((s.row === square.row || s.col === square.col || s.area === square.area)
                        && newSquare.potential_vals[val - 1] === true) {
                        newSquare.potential_vals[val - 1] = false;
                        if (mode === -1) {
                            let operation = new Operation('setPotentialVal', val, newSquare.id, OperationsID, pre_val);
                            setOperations(operations => [...operations, operation]);
                            setOperationsID(OperationsID + 1);
                        }
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
        showHighLightWrapper(id);
        findError();
        checkGameOver();
    }

    const showHighLightWithSelectedVal = (val) => {
        let newBoard = [...Squares];
        for (let i = 0; i < newBoard.length; ++i) {
            newBoard[i].enableHighLight = 0;
            if (newBoard[i].cur_val === val)
                newBoard[i].enableHighLight = 1;
            else if (newBoard[i].cur_val < 1 && val >= 0) {
                if (newBoard[i].potential_vals[val - 1] === true) {
                    newBoard[i].enableHighLight = 2;
                }
            }
        }
        setSquares(newBoard);
    }

    const showHighLight = (board, val, row, col, area) => {
        for (let i = 0; i < board.length; ++i) {
            if (val !== 0) {
                if (board[i].cur_val === val) {
                    board[i].enableHighLight = 1;
                }
                else if (board[i].cur_val === 0 && board[i].potential_vals[val - 1] === true) {
                    board[i].enableHighLight = 2;
                }
                else if ((board[i].row === row || board[i].col === col || board[i].area === area)) {
                    board[i].enableHighLight = 3;
                }
            }
            else {
                if (board[i].row === row || board[i].col === col || board[i].area === area) {
                    board[i].enableHighLight = 3;

                }
                else {
                    board[i].enableHighLight = 0;
                }

            }
        }
        return board;
    }

    const showHighLightWrapper = (id) => {
        let targetSquare = Squares[id];
        let newBoard = [...Squares];
        for (let i = 0; i < newBoard.length; ++i) {
            newBoard[i].enableHighLight = 0;
        }
        newBoard = showHighLight(newBoard, targetSquare.cur_val, targetSquare.row, targetSquare.col, targetSquare.area);
        if (targetSquare.cur_val !== 0) {
            for (let i = 0; i < newBoard.length; ++i) {
                if (newBoard[i].cur_val === targetSquare.cur_val) {
                    newBoard = showHighLight(newBoard, targetSquare.cur_val, targetSquare.row, targetSquare.col, targetSquare.area);
                }
            }
        }

        setSquares(newBoard);
        setselectedSquareID(id);
    }

    const updatePencilMode = (e) => {
        setPencilMode(!pencilMode);
    }

    const reverseOperation = (e) => {
        if (Operations.length === 0) return;
        let operations = [...Operations];
        let index = operations.length - 1;
        let stepID = operations[operations.length - 1].stepsID;
        let selectedSquare = selectedSquareID;
        while (index >= 0 && operations[index].stepsID === stepID) {
            if (operations[index].action === 'setCurVal') {
                updateSquare(operations[index].squareID, operations[index].pre_val, 0);
            }
            else if (operations[index].action === 'setPotentialVal') {
                // mode 1 to setpotential vals
                updateSquare(operations[index].squareID, operations[index].val, 1);
            }
            --index;
            operations.pop(operations.length - 1);
        }
        setOperations(operations);
        setselectedSquareID(selectedSquare);
        //     const name = e.target.getAttribute("name")
        //      updateList(list.filter(item => item.name !== name));
    };

    useEffect(() => {
        initSquares();
    }, []);

    const onClickCancelSelect = (e) => {
        setselectedSquareID(-1);
        showHighLightWithSelectedVal(-1);
    }

    const startSolve = () => {
        var SudokuSolver = require('sudoku-solver-js');
        var solver = new SudokuSolver();
        var puzzle = '';
        for (let i = 0; i < Squares.length; ++i) {
            puzzle += Squares[i].cur_val.toString();
        }
        console.log(puzzle)
        let va = solver.solve(puzzle, { result: 'array' })
        console.log(va);
        setAnswers(va);
        return va;
    }

    const showHint = () => {
        if (Answers.length === 0)
            return;
        else {
            updateSquare(selectedSquareID, Answers[selectedSquareID]);
        }
    }

    const gaveUp = () => {
        if (Answers.length === 0) {
            let answers = startSolve();
            for (let i = 0; i < answers.length; ++i) {
                updateSquare(i, answers[i]);
            }
        }
        else {
            for (let i = 0; i < Answers.length; ++i) {
                updateSquare(i, Answers[i]);
            }
        }
    }

    const restart = () => {
        console.log('restart')
        props.setGameOver(false);
    }

    return (
        <div className={styles.Board}>
            <div></div>
            <div className={styles.BoardWrapper}>
                <div className={styles.Container}>
                    {Squares.map(square =>
                        <Square
                            key={square.row * 9 + square.col}
                            square={square}
                            updateSquare={updateSquare}
                            selectedSquareID={selectedSquareID}
                            showHighLightWrapper={showHighLightWrapper}
                        />
                    )}
                </div>

            </div>
            <div className={styles.controlArea}>
                <div className={styles.controlAreaButtons}>
                    {pencilMode ?
                        <IconButton color='primary' onClick={updatePencilMode}>
                            <BorderColorIcon />
                        </IconButton>
                        :
                        <IconButton onClick={updatePencilMode}>
                            <BorderColorIcon />
                        </IconButton>}

                    <IconButton onClick={reverseOperation}>
                        <RestoreIcon />
                    </IconButton>
                    <IconButton onClick={onClickCancelSelect}>
                        <ClearIcon />
                    </IconButton>
                    <IconButton onClick={startSolve}>
                        <EmojiObjectsIcon />
                        Solver
                    </IconButton>
                    <IconButton onClick={showHint}>
                        <SentimentVerySatisfiedIcon />
                    </IconButton>
                    <IconButton onClick={gaveUp}>
                        <ThumbDownAltIcon />
                    </IconButton>
                </div>

                <div className={styles.numberpad}>
                    <NumberPad val={1} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                    <NumberPad val={2} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                    <NumberPad val={3} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                    <NumberPad val={4} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                    <NumberPad val={5} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                    <NumberPad val={6} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                    <NumberPad val={7} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                    <NumberPad val={8} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                    <NumberPad val={9} selectedSquareID={selectedSquareID} updateSquare={updateSquare} />
                </div>

            </div>
        </div>
    );
}

export default Board;