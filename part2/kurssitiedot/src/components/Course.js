import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content name={course.name} parts={course.parts} />
            <Total course={course} />
        </div>
    )
}

export default Course