const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await helper.insertUsers()
  })

  test('a valid user can be created', async () => {
    const user = {
      username: 'abc',
      name: 'Name',
      password: 'blaa'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responseAfter = await api.get('/api/users')
    expect(responseAfter.body).toHaveLength(helper.initialUsers.length + 1)
  })

  test('a user cannot be created when its username is not unique', async () => {
    const user = helper.initialUsers[0] // Send one that is already in db

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body.error).toBeTruthy()

    const responseAfter = await api.get('/api/users')
    expect(responseAfter.body).toHaveLength(helper.initialUsers.length)
  })

  test('a user cannot be created when its username is too short', async () => {
    const user = {
      username: 'ab',
      name: 'Name',
      password: 'blaa'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body.error).toBeTruthy()

    const responseAfter = await api.get('/api/users')
    expect(responseAfter.body).toHaveLength(helper.initialUsers.length)
  })

  test('a user cannot be created when its password is too short', async () => {
    const user = {
      username: 'abcd',
      name: 'Name',
      password: 'bl'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body.error).toBeTruthy()

    const responseAfter = await api.get('/api/users')
    expect(responseAfter.body).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})