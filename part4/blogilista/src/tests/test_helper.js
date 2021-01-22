const Blog = require('../models/blog')
const User = require('../models/user')

const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
]

const initialUsers = [
  {
    username: 'first_user',
    name: 'First Name',
    password: 'firstpassword'
  }
]

const insertUsers = async () => {
  for (const user of initialUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const userHashed = new User({
      username: user.username,
      name: user.name,
      passwordHash: hashedPassword
    })

    await userHashed.save()
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await user.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb, insertUsers
}
