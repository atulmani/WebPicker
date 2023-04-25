import React from 'react';
import tryAgain from '../assets/img/try-again.gif';

const GameOver = ({ onResart, board }) => {

    if (board.hasWon()) {
        return <div className='tile2048' onClick={onResart}></div>
    } else if (board.hasLost()) {
        return <div className='gameOver' onClick={onResart}><img src={tryAgain} alt='Try Again' style={{ width: '100%', height: '100%', cursor: 'pointer' }}></img></div>
    }

    return (
        null
    )
}

export default GameOver
