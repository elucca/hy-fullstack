import React from 'react'

const Weather = ({ city, weather }) => {
    if (weather !== undefined) {
        return (
            <div>
                <h2>Weather in {city}</h2>
                <p>Temperature: {weather.current.temperature} C</p>
                <img src={weather.current.weather_icons[0]} alt={'Weather icon'} />
                <p>Wind: {weather.current.wind_speed} km/h, {weather.current.wind_dir}</p>
            </div>
        )
    }
    return (
        <div></div>
    )
}

export default Weather