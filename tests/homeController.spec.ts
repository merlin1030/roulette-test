import app from '../src/app'
import request from 'supertest'

describe('GET /', () => {
  test('should return 200 OK', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  test('should return HTML content', async () => {
    const response = await request(app).get('/')
    expect(response.type).toBe('text/html')
  })
})