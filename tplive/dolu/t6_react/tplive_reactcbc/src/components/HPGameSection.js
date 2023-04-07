import '../css/HPGameSection.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SingleCard from './SingleCard';

const cardImages = [
    { "src": "/img/game/badminton.png", matched: false },
    { "src": "/img/game/Table Tennis.png", matched: false },
    { "src": "/img/game/Lawn Tennis.png", matched: false },
    { "src": "/img/game/Cricket.png", matched: false },
    { "src": "/img/game/Squash.png", matched: false },
    { "src": "/img/game/Swimming.png", matched: false }
];


export default function HPGameSection() {

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [closeFlag, setCloseFlag] = useState(true);
    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
    }

    //handle Choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    //compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        }
                        else {
                            return card;
                        }
                    })
                })
                resetTurn();
            }
            else {
                setTimeout(() => resetTurn(), 1000);
                // resetTurn();
            }
        }
    }, [choiceOne, choiceTwo]);

    //start a new game automatically
    useEffect(() => {
        shuffleCards()
    }, [])

    // console.log(cards);

    //reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }

    const [showFlag, setShowFlag] = useState(true);

    let location = useLocation();
    // console.log(location.pathname);

    useEffect(() => {
        if (location.pathname === '/PhoneSignUp' || location.pathname === '/UserProfile') {
            setShowFlag(false);
        } else {
            setShowFlag(true);
        }
    }, [])

    function closeGame() {
        setCloseFlag(true);
    }
    function showGame() {
        setCloseFlag(false);
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

                    <div className='row no-gutters' onClick={showGame}>
                        <div className='col-lg-4 col-md-6 col-sm-12'>
                            <div className='padding-div'>
                                <div className='game-section-card'>
                                    <img src='./img/game/gameSection1.png'></img>
                                    <div className='game-name-tag left'></div>
                                    <div className='game-name'>
                                        <h1>Flip & Match</h1>
                                    </div>
                                    <div className='game-name-tag right'></div>
                                </div>
                                <br /><br /><br />
                            </div>
                        </div>
                    </div><br />

                    <div className="comming-soon">
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_pnqcpdc8.json" background="transparent"
                            speed="1" loop autoplay></lottie-player>
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_bhocdt4s.json" background="transparent"
                            speed="2" loop autoplay></lottie-player>
                    </div>

                </div><br /><br />
            </div>}

            {showFlag && <div className={closeFlag ? 'open-game-div' : 'open-game-div open'}>

                <div className='open-game-div-close-btn' onClick={closeGame}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </div>
                <div className='open-game-div-inner' >
                    <div className='open-game-div-heading'>
                        <h1>Flip & Match - Memory Challenge</h1>
                        <div className='large' onClick={closeGame}>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </div>
                    </div>
                    <div className='flip-game-outter-div'>
                        <div className='flip-game-inner-div'>
                            <div className='flip-game-heading'>
                                {/* <h1>Flip & Match</h1>
                                <h3>A Memory Challenge</h3> */}<br className='small' />
                                <button onClick={shuffleCards}>
                                    <span>New Game</span>
                                </button>

                                <p>Your Turns: {turns}</p>

                                <div className='container flip-game-card-grid'>
                                    {
                                        cards.map(card => (
                                            <SingleCard
                                                key={card.id}
                                                card={card}
                                                handleChoice={handleChoice}
                                                flipped={card === choiceOne || card === choiceTwo || card.matched}
                                                disabled={disabled}>
                                            </SingleCard>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <br className='small' /><br className='small' />
                    </div>

                </div>

            </div >}


        </section >

    )
}
