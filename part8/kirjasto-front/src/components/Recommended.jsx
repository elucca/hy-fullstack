import { useState } from 'react'
import { useQuery } from '@apollo/client'

const Recommended = ({ show, genreQuery, user }) => {
  if (!show) {
    return null
  }

  if (user === null) {
    return <div>please log in for recommendations</div>
  }

  const booksRes = useQuery(genreQuery, {
    variables: { genre: user.favoriteGenre },
  })

  if (booksRes.loading) {
    return <div>Loading...</div>
  }

  const books = booksRes.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre {user.favoriteGenre}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
