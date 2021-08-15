import React, { useState } from 'react';
import Board from '../Board/Board'
const Game = () => {
    const [gameOver, setGameOver] = useState(false);
    return (
            <Board
                setGameOver={setGameOver}
                gameOver={gameOver}
            />
    );
}

export default Game;