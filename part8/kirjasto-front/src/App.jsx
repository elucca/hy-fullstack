import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from '@apollo/client'
import { resultKeyNameFromField } from "@apollo/client/utilities";

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
query {
    allBooks {
      title
      author
      published
    }
  }
`

const App = () => {
  const [page, setPage] = useState("authors");
  const authorsRes = useQuery(ALL_AUTHORS)
  const booksRes = useQuery(ALL_BOOKS)

  if (authorsRes.loading || booksRes.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={authorsRes.data.allAuthors} />

      <Books show={page === "books"} books={booksRes.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
export { ALL_BOOKS, ALL_AUTHORS }
