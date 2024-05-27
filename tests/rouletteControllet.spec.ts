import app from '../src/app'
import request from 'supertest'
import { deleteRoulette } from '../src/services/rouletteService'

describe('GET /roulette', () => {
  test('should return 200 OK', async () => {
    const response = await request(app).get('/roulette')
    expect(response.statusCode).toBe(200)
  })

  test('should return HTML content', async () => {
    const response = await request(app).get('/roulette')
    expect(response.type).toBe('text/html')
  })
})

describe('POST /roulette', () => {
  let rouletteId1: string = '';
  let rouletteId2: string = '';
  test('should response a roulette object', async () => {
    const response = await request(app).post('/roulette').send(
      {
        name: 'Roulette 1',
        cost: 1,
        prizes: [{ name: 101, probability: 0.2 }]
      })
    rouletteId1 = response.body.roulette._id;
    expect(response.body).toHaveProperty('roulette')
  })

  test('should respont with a 201 status code', async () => {
    const response = await request(app).post('/roulette').send(
      {
        name: 'Roulette 2',
        cost: 1,
        prizes: [{ name: 102, probability: 0.2 }]
      })
    rouletteId2 = response.body.roulette._id;
    expect(response.statusCode).toBe(201)
  })

  afterAll(async () => {
    await deleteRoulette(rouletteId1);
    await deleteRoulette(rouletteId2);
  })
})

describe('DELETE /roulette', () => {
  let rouletteId: string = '';
  beforeAll(async () => {
    const response = await request(app).post('/roulette').send(
      {
        name: 'Roulette 3',
        cost: 1,
        prizes: [{ name: 103, probability: 0.2 }]
      })
    rouletteId = response.body.roulette._id;
  });

  test('should respond with a 204 status code', async () => {
    const response = await request(app).delete('/roulette').send({ id: rouletteId })
    expect(response.statusCode).toBe(204)
  })

  test('should respond a message', async () => {
    const response = await request(app).delete('/roulette').send({ id: rouletteId })
    expect(response.body).toHaveProperty('message')
  })
})

