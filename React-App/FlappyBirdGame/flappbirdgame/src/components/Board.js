import React from 'react';
import { useEffect, useState } from 'react';
import './Board.css';
import Bird from '../components/Bird';
import Obstacle from './Obstacle';

export default function Board() {

    const gameDimension = {
        gameHeight: 500,
        gameWidth: 500
    };

    const birdSize = 80;
    const gravity = 6;
    const jumpHeight = 140;
    const obstacleWidth = 60;
    const obstacleGap = 250;

    const [birdPosition, setBirdPosition] = useState(250);
    const [gameHasStarted, setGameHasStarted] = useState(false);
    const [topObstacleHeight, setTopObstacleHeight] = useState(100);
    const [obstacleleft, setObstacleLeft] = useState(gameDimension.gameWidth - obstacleWidth);
    const [score, setScore] = useState(0);

    const bottomtopObstacleHeight = gameDimension.gameHeight - obstacleGap - topObstacleHeight;

    useEffect(() => {

        let timeId;

        if (gameHasStarted && birdPosition < gameDimension.gameHeight - birdSize) {
            timeId = setInterval(() => {
                setBirdPosition(birdPosition => birdPosition + gravity);
            }, 24)
        }

        return () => {
            clearInterval(timeId);
        };

    }, [birdPosition, gameDimension.gameHeight, gameHasStarted]);

    useEffect(() => {

        let obstacleId;

        if (gameHasStarted && obstacleleft >= -obstacleWidth) {
            obstacleId = setInterval(() => {
                setObstacleLeft((obstacleleft) => obstacleleft - 5)
            }, 24);

            return () => {
                clearInterval(obstacleId);
            }
        } else {
            setObstacleLeft(gameDimension.gameWidth - obstacleWidth);
            setTopObstacleHeight(Math.floor(Math.random() * (gameDimension.gameHeight - obstacleGap)));
            setScore(score + 1);
        }
    }, [gameDimension.gameHeight, gameDimension.gameWidth, gameHasStarted, obstacleleft]);

    useEffect(() => {
        const hasCollidedWithTopObstacle = birdPosition >= 0 && birdPosition < topObstacleHeight;
        const hasCollidedWithBottomObsatcle = birdPosition <= 500 && birdPosition >= 500 - bottomtopObstacleHeight;

        if (obstacleleft >= 0 && obstacleleft <= (obstacleWidth + 60) && (hasCollidedWithTopObstacle || hasCollidedWithBottomObsatcle)) {
            setGameHasStarted(false);
            setScore(0);
        }
    }, [birdPosition, bottomtopObstacleHeight, obstacleleft, topObstacleHeight]);

    const handleClick = () => {

        if (!gameHasStarted) {
            setGameHasStarted(true);
        }

        let newBirdPosition = birdPosition - jumpHeight;
        if (newBirdPosition <= 0) {
            setBirdPosition(0);
        } else {
            setBirdPosition(newBirdPosition);
        }
    };

    return (
        <div className='board' onClick={handleClick}>
            <div className='game-box' style={{ height: gameDimension.gameHeight + 'px', width: gameDimension.gameWidth + 'px' }}>
                <Obstacle
                    top={0}
                    width={obstacleWidth}
                    height={topObstacleHeight}
                    left={obstacleleft}
                />
                <Obstacle
                    top={gameDimension.gameHeight - (topObstacleHeight + bottomtopObstacleHeight)}
                    width={obstacleWidth}
                    height={bottomtopObstacleHeight}
                    left={obstacleleft}
                />
                <Bird top={birdPosition}></Bird>
            </div>
            <span>{score}</span>
        </div>
    )
}
