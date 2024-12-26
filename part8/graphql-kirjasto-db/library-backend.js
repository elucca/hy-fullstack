const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    me: (root, args, context) => {
      return context.currentUser
    },
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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('User is not authenticated.', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      if (args.title.length < 5) {
        throw new GraphQLError('Book title must be 5 or more characters.', {
          invalidArgs: args.title,
        })
      }

      if (args.author.length < 4) {
        throw new GraphQLError('Author name must be 4 or more characters.', {
          invalidArgs: args.author,
        })
      }

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

    editAuthor: async (root, args, context) => {

      if (!currentUser) {
        throw new GraphQLError('User is not authenticated.', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let a = await Author.findOne({ name: args.name })
      if (!a) {
        throw new GraphQLError('Author to update not found.', {
          invalidArgs: args.name,
        })
      }

      if (isNaN(parseInt(args.setBornTo))) {
        throw new GraphQLError('Please provide a valid birth year.', {
          invalidArgs: args.setBornTo,
        })
      }

      a.born = args.setBornTo
      await a.save()
      return a
    },

    createUser: async (root, args) => {
      const usr = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return usr.save().catch(error => {
        throw new GraphQLError('Failed to create user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
