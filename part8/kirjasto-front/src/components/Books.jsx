import { useState } from 'react'
import { useQuery } from '@apollo/client'

const Books = ({ show, genreQuery }) => {
  if (!show) {
    return null
  }

  const [selectedGenre, setSelectedGenre] = useState('')

  const booksRes = useQuery(genreQuery, {
    variables: { genre: selectedGenre },
  })

  if (booksRes.loading) {
    return <div>Loading...</div>
  }

  const books = booksRes.data.allBooks

  const genres = Array.from(
    new Set(
      books.flatMap(book => {
        return book.genres
      })
    )
  )

  return (
    <div>
      <h2>books</h2>

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

      <div>
        <button onClick={() => setSelectedGenre('')}>show all</button>
        {genres.map(genre => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
