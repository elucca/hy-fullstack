const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: String!
    ): Author
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: String
    bookCount: Int!
    id: ID!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        const authorExists = await Author.findOne({ name: args.author })
        if (!authorExists) {
          return []
        }
        let filteredBooks = await Book.find({ author: authorExists._id })
        return filteredBooks.filter(book => book.genres.includes(args.genre))
      } else if (args.author) {
        const authorExists = await Author.findOne({ name: args.author })
        if (!authorExists) {
          return []
        }
        let filteredBooks = await Book.find({ author: authorExists._id })
        return filteredBooks
      } else if (args.genre) {
        let books = await Book.find({})
        return books.filter(book => book.genres.includes(args.genre))
      }

      let all = await Book.find({})
      return all
    },
    allAuthors: async () => Author.find({}),
  },

  Book: {
    author: async root => {
      return Author.findById(root.author)
    },
  },
  Author: {
    bookCount: async root => {
      let books = await Book.countDocuments({ author: root._id })
      return books
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let a = await Author.findOne({ name: args.author })
      if (!a) {
        a = new Author({ name: args.author })
        await a.save()
      }

      const book = new Book({
        title: args.title,
        author: a._id,
        published: args.published,
        genres: args.genres,
      })

      await book.save()
      return book
    },
    editAuthor: async (root, args) => {
      let a = await Author.findOne({ name: args.name })
      if (!a) {
        throw new GraphQLError('Author to update not found.', {
          invalidArgs: args.name,
        })
      }

      a.born = args.setBornTo
      await a.save()
      return a
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
