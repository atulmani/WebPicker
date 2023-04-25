import React from 'react';
import { useState, useEffect } from 'react';

import Cell from './Cell';
import Tile from './Tile';
import { Board } from '../helper/index';
import useEvent from '../hooks/useEvent';
import GameOver from './GameOver';
import '../main.scss';
import '../styles.scss';

const BoardView = () => {
    let indexR = 1;
    let indexC = 1;
    let indexT = 1;

    const [board, setBoard] = useState(new Board());

    const handleKeyDown = (event) => {
        if (board.hasWon()) {
            return;
        }

        if (event.keyCode >= 37 && event.keyCode <= 40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    };


    useEvent('keydown', handleKeyDown);

    useEffect(() => {
        var gameBox = document.getElementById('gameBox');

        var outPut = document.getElementById('outPut');

        // initiate mouse X and Y positions to 0

        let mouseX, initialX = 0;
        let mouseY, initialY = 0;
        let isSwiped;

        // Events for touch and mouse

        let mouseEvents = {
            mouse: {
                down: 'mousedown',
                move: 'mousemove',
                up: 'mouseup',
            },
            touch: {
                down: 'touchstart',
                move: 'touchmove',
                up: 'touchend',
            },
        }


        let deviceType = '';

        // Detect touch device

        const isToucheDevice = () => {
            try {

                // We try to create TouchEvent (it would fail for destops and throw error)

                document.createEvent('TouchEvent');
                deviceType = 'touch';
                return true;

            } catch (e) {
                deviceType = 'mouse';
                return false;
            }
        }

        // Get left and top of touch area
        let rectLeft = gameBox.getBoundingClientRect().left;
        let rectTop = gameBox.getBoundingClientRect().top;

        // Get exact X and Y position of touch/mouse
        const getXY = (e) => {
            mouseX = (!isToucheDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
            mouseY = (!isToucheDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
        }

        isToucheDevice();

        // Start swipe
        gameBox.addEventListener(mouseEvents[deviceType].down, (event) => {
            isSwiped = true;

            // Get X and Y position
            getXY(event);
            initialX = mouseX;
            initialY = mouseY;

            //Mousemove / Touchmove
            gameBox.addEventListener(mouseEvents[deviceType].move, (event) => {
                // if (!isToucheDevice()) {
                //     event.preventDefault();
                // }
                // if (isSwiped) {
                //     let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
                //     let newBoard;
                //     getXY(event);
                //     let diffX = mouseX - initialX;
                //     let diffY = mouseY - initialY;
                //     if (Math.abs(diffY) > Math.abs(diffX)) {
                //         newBoard = diffY > 0 ? boardClone.move(3) : boardClone.move(1);
                //     } else {
                //         newBoard = diffX > 0 ? boardClone.move(2) : boardClone.move(0);
                //     }
                //     setBoard(newBoard);
                // }
            })
        });

        //Stop Drawing
        gameBox.addEventListener(mouseEvents[deviceType].up, (event) => {
            if (!isToucheDevice()) {
                event.preventDefault();
            }
            if (isSwiped) {
                let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
                let newBoard;
                getXY(event);
                let diffX = mouseX - initialX;
                let diffY = mouseY - initialY;
                if (Math.abs(diffY) > Math.abs(diffX)) {
                    newBoard = diffY > 0 ? boardClone.move(3) : boardClone.move(1);
                } else {
                    newBoard = diffX > 0 ? boardClone.move(2) : boardClone.move(0);
                }
                setBoard(newBoard);
            }
            isSwiped = false;
        })

        gameBox.addEventListener('mouseleave', () => {
            isSwiped = false;
        })

        window.onload = () => {
            isSwiped = false;
        }

    });

    const cells = board.cells.map((row, rowIndex) => {
        return <div key={indexR++}>

            {row.map((col, colIndex) => {
                return <Cell key={indexC++}></Cell>
            })}
        </div>
    })

    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, index) => {
        return <Tile key={indexT++} tile={tile}></Tile>
    });

    const resetGame = () => {
        setBoard(new Board());
    }

    return (
        <div id='gameBox' style={{
            display: 'flex',
            backgroundColor: '#57407c',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            fontSize: '21px'
        }}>
            <div className='details-box'>
                <div className='resetButton' onClick={resetGame}>New Game</div>
                <div className='score-box'>
                    <div className='score-header'>SCORE</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <div className='board'>
                {cells}
                {tiles}
                <GameOver onResart={resetGame} board={board}></GameOver>
            </div>
        </div >
    )
}

export default BoardView
