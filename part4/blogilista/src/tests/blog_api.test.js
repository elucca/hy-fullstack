const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await blog.deleteMany({})
  await blog.insertMany(helper.initialBlogs)
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

test('a new blog can be added', async () => {
  const blog = helper.initialBlogs[0]
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

  // check that the added blog has correct title (could do fuller validation here)
  const titles = response.body.map(blog => blog.title)
  expect(titles).toContain(helper.initialBlogs[0].title)
})

test('a new blog with undefined likes is saved with 0 likes', async () => {
  const newBlog = {
    title: 'Undefined likes',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body.find(blog => blog.title === 'Undefined likes')

  expect(addedBlog.likes).toBe(0)
})

test('a new blog with undefined title or url is not added', async () => {
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
    .send(undefinedUrl)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(undefinedTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(bothUndefined)
    .expect(400)

})

test('a blog can be deleted', async () => {
  const response = await api.get('/api/blogs')
  const blogId = response.body[0].id
  
  await api
  .del(`/api/blogs/${blogId}`)
  .expect(204)

  const resAfterDelete = await api.get('/api/blogs')
  expect(resAfterDelete.body).toHaveLength(helper.initialBlogs.length - 1)  
})

afterAll(() => {
  mongoose.connection.close()
})
