import cardHistory from './game.js'
import { useEffect, useState } from 'react'
import './App.css'

function GameCards({ onCardSelect }) {
    const [cardList, setCardList] = useState({})

    useEffect(() => {
        let isCancelled = false
        async function getCardList() {
            await fetch("https://picsum.photos/v2/list")
                .then((response) => {
                    if (response.ok && !isCancelled) {
                        return response.json();
                    }
                    return new Error("Failed to establish connection to API")
                })
                .then((response) => setCardList(response))
                .catch((err) => console.log(err))
        }

        getCardList()

        return () => isCancelled = true;
    }, [])

    /* Fisher-Yates (Knuth) Shuffle
        Credit goes to @coolaj86 on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    */
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    return (
        <section className="cards">
            {
                Array.from(cardList)
                    .map((value, idx) => (
                        <div
                            className="card"
                            key={idx}
                            onClick={(_) => {
                                setCardList(shuffle(cardList))
                                onCardSelect(value.id)
                            }}
                        >
                            <img src={value.download_url}
                                alt=""
                                className="card__image"
                            />
                            <p className="card__author"> @{value.author}</p>
                        </div>
                    ))
            }
        </section>
    )
}

function Scoreboard({ score }) {
    const { current, best } = score;
    return (
        <section className="game__scoreboard">
            <div className="game__currentScore">
                <p className="scoreboard__heading">Your Score</p>
                <p className="game__currentScoreValue"> {current} </p>
            </div>
            <div className="scoreboard__delimiter"></div>
            <div className="game__bestScore">
                <p className="scoreboard__heading">Best Score</p>
                <div className="scoreboard__item">
                    <p className="scoreboard__heading"> Easy </p>
                    <p className="scoreboard__score"> {best.easy}</p>
                </div>
                <div className="scoreboard__item">
                    <p className="scoreboard__heading">Medium</p>
                    <p className="scoreboard__score"> {best.medium}</p>
                </div>
                <div className="scoreboard__item">
                    <p className="scoreboard__heading">Hard</p>
                    <p className="scoreboard__score"> {best.hard}</p>
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
    const [currentMode, setCurrentMode] = useState("easy");
    const [bestScore, setBestScore] = useState({
        easy: 0, medium: 0, hard: 0,
    });

    const [hist, setHist] = useState(new cardHistory(historySize));

    return (
        <section className="app__main">
            <DifficultyButtons onDiffChange={(difficulty) => {
                /* Is there a more elegant way to do this? */
                if (difficulty === "difficulty--easy" && historySize !== 3) {
                    setCurrentMode("easy")
                    setHistorySize(3)
                    setHist(new cardHistory(3))
                } else if (difficulty === "difficulty--medium" && historySize !== 5) {
                    setCurrentMode("medium")
                    setHistorySize(5)
                    setHist(new cardHistory(5))
                } else if (difficulty === "difficulty--hard" && historySize !== 8) {
                    setCurrentMode("hard")
                    setHistorySize(8)
                    setHist(new cardHistory(8))
                }
                setCurrentScore(0)
            }} />
            <Scoreboard score={{ best: bestScore, current: currentScore }} />
            <GameCards onCardSelect={(value) => {
                const result = hist.add(value)
                if (result === 0) setCurrentScore(currentScore + 1);
                else {
                    switch (currentMode) {
                        case "easy":
                            if (bestScore.easy < currentScore) {
                                setBestScore({
                                    ...bestScore, easy: currentScore,
                                })
                            }
                            break;
                        case "medium":
                            if (bestScore.medium < currentScore) {
                                setBestScore({
                                    ...bestScore, medium: currentScore,
                                })
                            }
                            break;
                        case "hard":
                            if (bestScore.hard < currentScore) {
                                setBestScore({
                                    ...bestScore, hard: currentScore,
                                })
                            }
                            break;
                    }
                    hist.clear();
                    setCurrentScore(0);
                }
            }} />
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
