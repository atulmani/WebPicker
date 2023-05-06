import '../css/HPGameSection.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import GameFnM from './GameFnM';
import TicTacToe from './TicTacToe'
import Board from './Board'


export default function HPGameSection() {

    const [gameFlag, setGameFlag] = useState({
        closeFlag: true,
        game: ''
    });

    const [showFlag, setShowFlag] = useState(true);

    let location = useLocation();

    useEffect(() => {
        if (location.pathname === '/PhoneSignUp' || location.pathname === '/UserProfile') {
            setShowFlag(false);
        } else {
            setShowFlag(true);
        }
    }, [])

    function closeGame() {
        setGameFlag({
            closeFlag: true,
            game: ''
        });
    }
    function showGameFnM() {
        setGameFlag({
            closeFlag: false,
            game: 'FnM'
        });
        // setCloseFlag(false);
    }

    function showGameTTT() {
        setGameFlag({
            closeFlag: false,
            game: 'TTT'
        });
        // setCloseFlag(false);
    }

    function showGame2048() {
        setGameFlag({
            closeFlag: false,
            game: '2048'
        });
        // setCloseFlag(false);
    }
    return (
        <section>
            {showFlag && <div className="games-section"><br />
                <div className="container">

                    <div className="heading">
                        <span className="material-symbols-outlined">
                            scoreboard
                        </span>
                        <h4 style={{ fontEeight: '1000' }}>Your Playground</h4>
                    </div><br />

                    <div className='row no-gutters' >
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <div className='padding-div'>
                                <div className='game-section-card' onClick={showGameFnM}>
                                    <img src='./img/game/gameSection1.png' alt="Flip & Match"></img>
                                    <div className='game-name-tag left'></div>
                                    <div className='game-name'>
                                        <h1>Flip & Match</h1>
                                    </div>
                                    <div className='game-name-tag right'></div>
                                </div>
                                <br /><br /><br />
                            </div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <div className='padding-div'>
                                <div className='game-section-card' onClick={showGameTTT}>
                                    <img src='./img/game/gameSection2.png' alt="Tic Tac Toe"></img>
                                    <div className='game-name-tag left'></div>
                                    <div className='game-name'>
                                        <h1>Tic Tac Toe</h1>
                                    </div>
                                    <div className='game-name-tag right'></div>
                                </div>
                                <br /><br /><br />
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <div className='padding-div'>
                                <div className='game-section-card' onClick={showGame2048}>
                                    <img src='./img/game/gameSection3.png' alt="2048"></img>
                                    <div className='game-name-tag left'></div>
                                    <div className='game-name'>
                                        <h1>2048</h1>
                                    </div>
                                    <div className='game-name-tag right'></div>
                                </div>
                                <br /><br /><br />
                            </div>
                        </div>
                    </div><br />
                    {/* 
                    <div className="comming-soon">
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_pnqcpdc8.json" background="transparent"
                            speed="1" loop autoplay></lottie-player>
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_bhocdt4s.json" background="transparent"
                            speed="2" loop autoplay></lottie-player>
                    </div> */}

                </div><br /><br />
            </div>}

            {showFlag && <div className={gameFlag.closeFlag ? 'open-game-div' : 'open-game-div open'}>

                <div className='open-game-div-close-btn' onClick={closeGame}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div className='open-game-div-inner' >
                    <div className='open-game-div-heading'>
                        <h1>{gameFlag.game === 'FnM' ? 'Flip & Match - Memory Challenge' : gameFlag.game === 'TTT' ? ' Tic Tac Toe - 2 Player' : ''}</h1>
                        <div className='large' onClick={closeGame}>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </div>
                    </div>
                    {gameFlag.game === 'FnM' ? <GameFnM></GameFnM> : gameFlag.game === 'TTT' ? <TicTacToe></TicTacToe> : ''}

                </div>

            </div >}

            {showFlag && <div className={gameFlag.closeFlag ? 'open-game-div' : 'open-game-div open'}>

                <div className='open-game-div-close-btn' onClick={closeGame}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div className='open-game-div-inner' >
                    <div className='open-game-div-heading'>
                        <h1>{gameFlag.game === 'FnM' ? 'Flip & Match - Memory Challenge' : gameFlag.game === 'TTT' ? ' Tic Tac Toe - 2 Player' : gameFlag.game === '2048' ? '2048' : ''}</h1>
                        <div className='large' onClick={closeGame}>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </div>
                    </div>
                    {gameFlag.game === 'FnM' ? <GameFnM></GameFnM> : gameFlag.game === 'TTT' ? <TicTacToe></TicTacToe> : gameFlag.game === '2048' ? <Board></Board> : ''}

                </div>

            </div >}


        </section >

    )
}
