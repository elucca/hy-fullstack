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
                <Statistics goods={good} neutrals={neutral} bads={bad} />
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
    if (counts(goods, neutrals, bads) === 0) {
        return (
            <>
                <div>
                    <Title text="Statistics" />
                </div>

                <div>
                    <p>No feedback given.</p>
                </div>
            </>
        )
    }

    return (
        <>
            <div>
                <Title text="Statistics" />
            </div>

            <div>
                <Statistic text="Good: " value={goods} />
                <Statistic text="Neutral: " value={neutrals} />
                <Statistic text="Bad: " value={bads} />

                <br></br>

                <Statistic text="Total: " value={counts(goods, neutrals, bads)} />
                <Statistic text="Average: " value={average(goods, neutrals, bads)} />
                <Statistic text="Positive: " value={positivePercentage(goods, neutrals, bads)} />
            </div>
        </>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <p>{text}: {value}</p>
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

    return (goods / count) * 100 + "%"
}

ReactDOM.render(<App />, document.getElementById('root'));