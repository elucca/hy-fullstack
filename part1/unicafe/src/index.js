import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <div>
                <div>
                    <Title text="Give feedback" />
                </div>

                <div>
                    <Button name="Good" setValue={setGood} currValue={good} />
                    <Button name="Neutral" setValue={setNeutral} currValue={neutral} />
                    <Button name="Bad" setValue={setBad} currValue={bad} />
                </div>
            </div>

            <div>
                <div>
                    <Title text="Statistics" />
                </div>

                <div>
                    <Statistics goods={good} neutrals={neutral} bads={bad} />
                </div>
            </div>
        </div>
    )
}

const Title = (props) => {
    return (
        <>
            <h2>{props.text}</h2>
        </>
    )
}

const Button = ({ name, setValue, currValue }) => {
    return (
        <button onClick={() => setStateToValue(setValue, currValue + 1)}>{name}</button>
    )
}

const Statistics = ({ goods, neutrals, bads }) => {
    return (
        <>
            <p>Good: {goods}</p>
            <p>Neutral: {neutrals}</p>
            <p>Bad: {bads}</p>

            <br></br>

            <p>Total: {counts(goods, neutrals, bads)}</p>
            <p>Average: {average(goods, neutrals, bads)}</p>
            <p>Positive: {positivePercentage(goods, neutrals, bads)}%</p>
        </>
    )
}

const setStateToValue = (setValue, newValue) => {
    // I think this re-renders App (and hence everything) cause
    // the state is defined in the App component?
    setValue(newValue)
}

const counts = (goods, neutrals, bads) => {
    return goods + neutrals + bads
}

const average = (goods, neutrals, bads) => {
    let count = counts(goods, neutrals, bads)
    let sum = goods - bads
    if (count === 0) {
        return 0;
    }
    return sum / count
}

const positivePercentage = (goods, neutrals, bads) => {
    let count = counts(goods, neutrals, bads)
    if (count === 0) {
        return 0;
    }
    return (goods / count) * 100
}

ReactDOM.render(<App />, document.getElementById('root'));