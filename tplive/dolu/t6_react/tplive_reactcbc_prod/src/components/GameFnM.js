import React, { useState, useEffect } from 'react'
import '../css/GameFnM.css'
import SingleCard from './SingleCard';


const cardImages = [
    { "src": "/img/game/badminton.png", matched: false },
    { "src": "/img/game/Table Tennis.png", matched: false },
    { "src": "/img/game/Lawn Tennis.png", matched: false },
    { "src": "/img/game/Cricket.png", matched: false },
    { "src": "/img/game/Squash.png", matched: false },
    { "src": "/img/game/Swimming.png", matched: false }
];
export default function GameFnM() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    // const [closeFlag, setCloseFlag] = useState(true);
    const [gameFlag, setGameFlag] = useState({
        closeFlag: false,
        game: ''
    });

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


    return (

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

    )
}
