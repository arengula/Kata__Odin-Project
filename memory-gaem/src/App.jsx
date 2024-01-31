import cardHistory from './game.js'
import { useEffect, useState } from 'react'
import './App.css'

function GameCards() {
    const [cardList, setCardList] = useState({})

    useEffect(() => {
        async function getCardList() {
            await fetch("https://picsum.photos/v2/list")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    return new Error("Failed to establish connection to API")
                })
                .then((response) => {
                    setCardList(response)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getCardList()

        return function() {
            1 + 1
        }
    })

    return (
        <section className="cards">
            <div className="card">
                {
                    Array.from(cardList)
                        .map((value, idx) => (
                            <div key={idx}>
                                {`${value.id} - ${value.author}`}
                            </div>
                        )
                        )
                }
            </div>
        </section>
    )
}

function Scoreboard({ score }) {
    const { current, best } = score;
    return (
        <section className="game__scoreboard">
            <div className="game__currentScore">
                <p className="scoreboard__heading">Your Score</p>
                <p> {current} </p>
            </div>
            <div className="game__bestScore">
                <p className="scoreboard__heading">Best Score</p>
                <div className="scoreboard__item">
                    <p className="scoreboard__heading"> Easy </p>
                    <p> {best.easy}</p>
                </div>
                <div className="scoreboard__item">
                    <p className="scoreboard__heading">Medium</p>
                    <p> {best.medium}</p>
                </div>
                <div className="scoreboard__item">
                    <p className="scoreboard__heading">Hard</p>
                    <p> {best.hard}</p>
                </div>
            </div>
        </section>
    )
}

function DifficultyButtons({ onDiffChange }) {
    return (
        <section
            className="difficultySetter"
            onClick={
                (e) => {
                    onDiffChange(e.target.getAttribute("id"))
                    e.currentTarget
                        .childNodes
                        .forEach((item) => {
                            if (item === e.target) {
                                item.querySelector(".difficulty__indicator")
                                    .classList
                                    .add("difficulty__indicator--on")
                            } else {
                                item.querySelector(".difficulty__indicator")
                                    .classList
                                    .remove("difficulty__indicator--on")
                            }

                        })
                }
            }
        >
            <div className="difficulty__item" id="difficulty--easy">
                <div className="difficulty__indicator difficulty__indicator--on"></div>
                <p> Easy</p>
            </div>
            <div className="difficulty__item" id="difficulty--medium">
                <div className="difficulty__indicator"></div>
                <p> Medium </p>
            </div>
            <div className="difficulty__item" id="difficulty--hard">
                <div className="difficulty__indicator"></div>
                <p> Hard </p>
            </div>
        </section>
    )
}

function Game() {
    // Easy : 3, Medium : 5, Hard : 8
    const [historySize, setHistorySize] = useState(3);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState({
        easy: 0, medium: 0, hard: 0,
    });

    const hist = new cardHistory(historySize);

    return (
        <section className="app__main">
            <DifficultyButtons onDiffChange={(difficulty) => {
                if (difficulty === "difficulty--easy" && historySize !== 3) {
                    setHistorySize(3)
                } else if (difficulty === "difficulty--medium" && historySize !== 5) {
                    setHistorySize(5)
                } else if (difficulty === "difficulty--hard" && historySize !== 8) {
                    setHistorySize(8)
                }
            }} />
            <Scoreboard score={{ best: bestScore, current: currentScore }} />
            <GameCards />
        </section>
    )
}


function App() {
    return (
        <>
            <section className="app__header">
                <h1 className="app__title">Memorii</h1>
                <p className="app__subtitle">How far could your memory go?</p>
            </section>
            <Game />
        </>
    )
}

export default App
