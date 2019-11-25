import React from 'react'

const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification