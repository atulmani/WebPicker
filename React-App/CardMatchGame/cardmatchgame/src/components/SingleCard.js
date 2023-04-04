import React from 'react'
import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    function handleClick() {
        if (!disabled) {
            handleChoice(card);
        }
    }

    return (
        <>
            <div className='flip-game-card'>
                <div className={flipped ? "flipped" : ""}>
                    <img className='front' style={{ width: '80%' }} src={card.src} alt="card front"></img>
                    <img
                        className='back'
                        src="./img/logo.png"
                        alt="card back"
                        onClick={handleClick}></img>
                </div>
            </div >
        </>
    )
}
