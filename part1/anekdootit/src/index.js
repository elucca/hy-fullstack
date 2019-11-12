import React, { useState } from 'react'
import ReactDOM from 'react-dom'


// Ought to split App into multiple components
const App = (props) => {
    const [selected, setSelected] = useState(randomIndex(props.anecdotes.length))
    // Ideally should create an array of zeros based on the size of the anecdotes array, this assumes it stays the same.
    // Would be an easy change if it was needed.
    const [votes, setVotes] = useState( [ 0, 0, 0, 0, 0, 0 ] )

    return (
        <div>
            <div>
                {anecdotes[selected]}
            </div>
            <div>
                {'has ' + votes[selected] + ' votes'}
            </div>
            <div>
                <button onClick={() => upvoteAnecdote(selected, votes, setVotes)}>{'Vote'}</button>
                <button onClick={() => setAnecdote(props.anecdotes, setSelected)}>{'Next anecdote'}</button>
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often' ,
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const randomIndex = (anecdotesLength) => {
    return Math.floor(Math.random() * anecdotesLength)
}

const setAnecdote = (anecdotes, setSelected) => {
    setSelected(randomIndex(anecdotes.length))
}

const upvoteAnecdote = (selected, votes, setVotes) => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
}

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
