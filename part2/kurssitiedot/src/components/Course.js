import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
    return (
        <li>
            <Header course={course.name} />
            <Content name={course.name} parts={course.parts} />
            <Total course={course} />
        </li>
    )
}

export default Course