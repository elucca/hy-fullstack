const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await helper.insertUsers()
  await helper.insertBlogs()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have field named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('a new blog can be added by an authorized user', async () => {
  const token = await logIn()

  const blog = helper.initialBlogs[0]

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

  // check that the added blog has correct title (could do fuller validation here)
  const titles = response.body.map(blog => blog.title)
  expect(titles).toContain(helper.initialBlogs[0].title)
})

test('a blog cannot be added when user token is missing', async () => {
  const blog = helper.initialBlogs[0]

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(401)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a new blog added by an authorized user with undefined likes is saved with 0 likes', async () => {
  const token = await logIn()

  const newBlog = {
    title: 'Undefined likes',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body.find(blog => blog.title === 'Undefined likes')

  expect(addedBlog.likes).toBe(0)
})

test('a new blog added by an authorized user with undefined title or url is not added', async () => {
  const token = await logIn()

  const undefinedUrl = {
    title: 'Undefined url',
    author: 'Robert C. Martin',
    likes: 5,
  }

  const undefinedTitle = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 4,
  }

  const bothUndefined = {
    author: 'Robert C. Martin',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(undefinedUrl)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(undefinedTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(bothUndefined)
    .expect(400)

})

test('a blog can be deleted by the correct authorized user', async () => {
  const token = await logIn()
  const response = await api.get('/api/blogs')
  const blogId = response.body[0].id

  await api
    .del(`/api/blogs/${blogId}`)
    .set('Authorization', 'bearer ' + token)
    .expect(204)

  const resAfterDelete = await api.get('/api/blogs')
  expect(resAfterDelete.body).toHaveLength(helper.initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
  const response = await api.get('/api/blogs')
  const blogId = response.body[0].id

  const toUpdate = {
    title: 'new title',
    author: 'new author',
    url: 'new url',
    likes: 10,
  }

  await api
    .put(`/api/blogs/${blogId}`)
    .send(toUpdate)
    .expect(200)

  const responseAfterUpdate = await api.get('/api/blogs')
  expect(responseAfterUpdate.body[0]).toMatchObject(toUpdate)
})

afterAll(() => {
  mongoose.connection.close()
})

const logIn = async () => {
  const user = helper.initialUsers[0]

  const response = await api
    .post('/api/login')
    .send({ username: user.username, password: user.password })

  return response.body.token
}
