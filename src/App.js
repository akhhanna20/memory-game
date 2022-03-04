import './App.css';
import {nanoid} from 'nanoid';
import {useState, useEffect} from "react";
import Board from "./Board";


function App() {
    const picture = ["💖", "😊", " 🎶", "🎂", "🐱", "🎁"]

    const startGame = () => {

        let initialState = [];
        for (let i = 0; i < 12; i++) {
            initialState[i] = {
                id: nanoid(),
                value: '',
                isOpen: false
            }
        }


        for (let j = 0; j < picture.length; j++) {
            for (let m = 0; m < 2; m++) {
                let k
                do {
                    k = Math.floor(Math.random() * 12)
                } while (initialState[k].value !== '')
                initialState[k].value = picture[j]
            }
        }
        setField(initialState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => startGame(), [])

    const [field, setField] = useState([])

    const cardHandler = (id, value) => {
        const newField = field.map(el => el.id === id ? {...el, isOpen: true} : el);
        setField(newField)
        setHistory([...history, value])
    }
    const [history, setHistory] = useState([]);
    const checkMove = () => {
        if (history.length % 2 === 0) {
            if (history[history.length - 1] !== history[history.length - 2]) {
                const newField = field.map(el => el.value === history[history.length - 1] ||
                el.value === history[history.length - 2] ? {...el, isOpen: false} : el)
                setField(newField)
            }
        }
    }

    useEffect(() => {
        setTimeout(() => checkMove(), 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    const finishGame = () => {
        const newField = field.filter(el => el.isOpen === true)
        if (newField.length === 12) {
            setMovesAmount(history.length / 2)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => finishGame(), [history])

    const [movesAmount, setMovesAmount] = useState(null)

    const restart = () => {
        setMovesAmount(null);
        startGame();
        setHistory([])
    }


    return (
        <div>
            <h1>Memory game</h1>
            <Board
                field={field}
                cardHandler={cardHandler}
            />
            {movesAmount &&
                <div>
                    <h3>{`Congratulation! You finished game in ${movesAmount} moves!`}</h3>
                    <button onClick={restart}>Restart</button>
                </div>}

        </div>
    );
}

export default App;