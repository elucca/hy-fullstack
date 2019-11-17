import React from 'react'

const Total = ({ course }) => {
    const calcTotal = course.parts.reduce((acc, curr) => {
        return acc += curr.exercises
    }, 0)

    return (
        <div>
            <b>Total exercises: {calcTotal}</b>
        </div>
    )
}

export default Total