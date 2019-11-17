import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content name={course.name} parts={course.parts} />
        </div>
    )
}

export default Course