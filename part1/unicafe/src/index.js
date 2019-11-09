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
        </>
    )
}

const setStateToValue = (setValue, newValue) => {
    // I think this re-renders App (and hence everything) cause
    // the state is defined in the App component?
    setValue(newValue)
}

ReactDOM.render(<App />, document.getElementById('root'));