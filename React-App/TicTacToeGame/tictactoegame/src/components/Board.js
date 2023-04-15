import React, { useEffect, useMemo, useState } from 'react';
import Square from './Square';
import { useRef } from 'react'
import '../css/Board.css'

export default function Board() {

    const [boxValue, setBoxValue] = useState(Array(9).fill(null));
    const winnerDiv = useRef(false);
    const [showWinnerDiv, setShowWinnerDiv] = useState(winnerDiv.current);
    const selCount = useRef(0);
    const [isXTurn, setIsXTurn] = useState(true);
    const xWinCount = useRef(0);
    const oWinCount = useRef(0);
    const [isWinner, setIsWinner] = useState({
        playerValue: '',
        gridValue: {
            grid: [],
            gridClass: ''
        },
        winner: false,
        draw: false
    })
    const handleClick = (index) => {
        if (boxValue[index] !== null) {
            return;
        }
        const copyBoxValue = [...boxValue];
        copyBoxValue[index] = isXTurn ? 'X' : 'O';
        selCount.current = selCount.current + 1;
        let winner = checkWinner(copyBoxValue);
        if ((winner.draw === true || winner.winner === true)) {
            setIsWinner(winner);
            setTimeout(function () {
                winnerDiv.current = true;
                setShowWinnerDiv(!showWinnerDiv);
            }, 2000);
        } else {
            winnerDiv.current = false;
        }
        setIsXTurn(!isXTurn);
        setBoxValue(copyBoxValue);
    };

    const winnerLogic1 = [
        {
            grid: [0, 1, 2],
            gridClass: 'topRow'
        },
        {
            grid: [3, 4, 5],
            gridClass: 'middleRow'
        },
        {
            grid: [6, 7, 8],
            gridClass: 'bottomRow'
        },
        {
            grid: [0, 3, 6],
            gridClass: 'firstColoumn'
        },
        {
            grid: [1, 4, 7],
            gridClass: 'secondColoumn'
        },
        {
            grid: [2, 5, 8],
            gridClass: 'thirdColoumn'
        },
        {
            grid: [0, 4, 8],
            gridClass: 'firstDaigonal'
        },
        {
            grid: [2, 4, 6],
            gridClass: 'secondDaigonal'
        },
    ]

    const checkWinner = (bValue) => {
        for (let logic of winnerLogic1) {
            const [a, b, c] = logic.grid;
            if (bValue[a] !== null && bValue[a] === bValue[b] && bValue[a] === bValue[c]) {
                if (bValue[a] === 'X') {
                    xWinCount.current = xWinCount.current + 1;
                } else
                    oWinCount.current = oWinCount.current + 1;
                return {
                    playerValue: bValue[a],
                    gridValue: logic,
                    winner: true,
                    draw: false
                };
            }
        };

        if (selCount.current === 9) {
            return {
                playerValue: '',
                gridValue: {
                    grid: [],
                    gridClass: ''
                },
                winner: false,
                draw: true
            };
        } else {

            return {
                playerValue: '',
                gridValue: {
                    grid: [],
                    gridClass: ''
                },
                winner: false,
                draw: false
            };
        }

    };

    const handleReset = () => {
        winnerDiv.current = false;
        setIsWinner({
            playerValue: '',
            gridValue: {
                grid: [],
                gridClass: ''
            },
            winner: false,
            draw: false
        })
        selCount.current = 0;

        setBoxValue(Array(9).fill(null))


    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', padding: '10px' }}>
                <div className='board-container' >
                    <div className='win-count-div'>
                        <div className='win-count-div-inner' style={{ borderBottom: isXTurn ? '2px solid #07dac5' : '1px solid #ddd' }} >
                            <div>
                                <span style={{ color: '#07dac5' }}>X</span>
                                <span> : </span>
                                <span>{xWinCount.current === 0 ? '-' : xWinCount.current}</span>
                            </div>
                        </div>
                        <div className='win-count-div-inner' style={{ borderBottom: !isXTurn ? '2px solid #ff5757' : '1px solid #ddd' }}>
                            <div>
                                <span style={{ color: '#ff5757' }}>O</span>
                                <span> : </span>
                                <span>{oWinCount.current === 0 ? '-' : oWinCount.current}</span>
                            </div>
                        </div>
                    </div>
                    <div className={!isWinner.winner ? '' : isWinner.gridValue.gridClass} style={{ background: isWinner.playerValue === 'X' ? '#07dac5' : '#ff5757' }}></div>
                    {/* {!sWinnerDiv && (isWinner.winner || isWinner.draw) ?

                        <h4 className='player-chance'>
                            Game Over
                        </h4>
                        :
                        !sWinnerDiv ? <h4 className='player-chance'>Player {isXTurn ? <strong className="chance-x">X</strong> : <strong className="chance-o">O</strong>} Please Move</h4> :
                            ''
                    } */}
                    {!winnerDiv.current && (isWinner.winner || isWinner.draw) ?

                        <h4 className='player-chance'>
                            Game Over
                        </h4>
                        :
                        !winnerDiv.current ? <h4 className='player-chance'>Player {isXTurn ? <strong className="chance-x">X</strong> : <strong className="chance-o">O</strong>} Please Move</h4> :
                            ''
                    }
                    {
                        winnerDiv.current && (isWinner.winner || isWinner.draw) ?
                            <div>
                                <div className={winnerDiv.current ? 'winner-div show' : 'winner-div'}>
                                    <div>
                                        <h1 style={{ color: isWinner.playerValue === 'X' ? '#07dac5' : '#ff5757' }}>
                                            {isWinner.draw ? <>
                                                <span style={{ color: '#07dac5' }}>X</span>
                                                <span style={{ color: '#ff5757' }}>O</span>
                                            </> : <span>{isWinner.playerValue}</span>}
                                        </h1>
                                        {isWinner.winner ? <h2>Winner!</h2> : <h2>Draw!</h2>}

                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <button onClick={() => handleReset()}>
                                            <span>Play Again</span>
                                        </button>
                                    </div>
                                </div>

                                <br></br>
                                <div className='board-row'>
                                    <Square disable={isWinner.winner} name={boxValue[0] + '-box'} onClick={() => handleClick(0)} value={boxValue[0]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[1] + '-box'} onClick={() => handleClick(1)} value={boxValue[1]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[2] + '-box'} onClick={() => handleClick(2)} value={boxValue[2]}></Square>
                                </div>
                                <div className='board-row'>
                                    <Square disable={isWinner.winner} name={boxValue[3] + '-box'} onClick={() => handleClick(3)} value={boxValue[3]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[4] + '-box'} onClick={() => handleClick(4)} value={boxValue[4]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[5] + '-box'} onClick={() => handleClick(5)} value={boxValue[5]}></Square>
                                </div>
                                <div className='board-row'>
                                    <Square disable={isWinner.winner} name={boxValue[6] + '-box'} onClick={() => handleClick(6)} value={boxValue[6]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[7] + '-box'} onClick={() => handleClick(7)} value={boxValue[7]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[8] + '-box'} onClick={() => handleClick(8)} value={boxValue[8]}></Square>
                                </div>
                            </div >
                            :

                            <>
                                <br></br>
                                <div className='board-row'>
                                    <Square disable={isWinner.winner} name={boxValue[0] + '-box'} onClick={() => handleClick(0)} value={boxValue[0]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[1] + '-box'} onClick={() => handleClick(1)} value={boxValue[1]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[2] + '-box'} onClick={() => handleClick(2)} value={boxValue[2]}></Square>
                                </div>
                                <div className='board-row'>
                                    <Square disable={isWinner.winner} name={boxValue[3] + '-box'} onClick={() => handleClick(3)} value={boxValue[3]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[4] + '-box'} onClick={() => handleClick(4)} value={boxValue[4]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[5] + '-box'} onClick={() => handleClick(5)} value={boxValue[5]}></Square>
                                </div>
                                <div className='board-row'>
                                    <Square disable={isWinner.winner} name={boxValue[6] + '-box'} onClick={() => handleClick(6)} value={boxValue[6]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[7] + '-box'} onClick={() => handleClick(7)} value={boxValue[7]}></Square>
                                    <Square disable={isWinner.winner} name={boxValue[8] + '-box'} onClick={() => handleClick(8)} value={boxValue[8]}></Square>
                                </div>
                            </>
                    }
                </div >
            </div >
        </>
    )
}
