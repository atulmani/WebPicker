import React, { useEffect, useState } from 'react';

export default function GameOver(props) {
    const [iswon, setIswon] = useState(false);
    const [lost, setLost] = useState(false);
    useEffect(() => {
        setIswon(props.board.hasWon() === 0 ? false : true);
        setLost(props.board.hasLost());

    }, [])
    const callReset = () => {
        console.log('in callReset');
        props.resetGame();
    }

    return (
        <>
            {iswon && <div className='gameOver' onClick={callReset}>
                <h1>YOU WON!</h1>
                <h2>You have reached <strong>2048</strong></h2>
                <div className='resetButton'>Play Again</div>
            </div>
            }
            {
                lost && <div className='gameOver' onClick={callReset}>
                    <h1>GAME OVER!</h1>
                    <div className='resetButton' onClick={callReset}>Try Again</div>
                </div>
            }

        </>
    )
}


// export default function GameOver(props) {
//     const [iswon, setIswon] = useState(false);
//     const [lost, setLost] = useState(false);

//     useEffect(() => {
//         setIswon(props.board.hasWon() === 0 ? false : ture);
//         setLost(props.board.hasLost());

//     }, [])
//     function callReset() {
//         console.log('in callReset');
//         props.resetGame();
//     }

//     return (
//         { iswon && <div className='gameOver' onClick={callReset}>
//             <h1>YOU WON!</h1>
//             <h2>You have reached <strong>2048</strong></h2>
//             <div className='resetButton'>Play Again</div>
//         </div>
//             }
// {
//     lost && <div className='gameOver' onClick={callReset}>
//         <h1>GAME OVER!</h1>
//         <div className='resetButton'>Try Again</div>
//     </div>
// }
//     )

// }
// // export default GameOver
