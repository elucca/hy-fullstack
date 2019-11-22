import React from 'react'

const Languages = ({ country }) => {

    const rows = country.languages.map(language =>
        <li key={language.iso639_2}>{language.name}</li>
    )

    return (
        <div>
            <h2>Languages</h2>

            <ul>
                {rows}
            </ul>
        </div>
    )
}

export default Languages