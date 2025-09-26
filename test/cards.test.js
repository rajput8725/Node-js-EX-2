/** Basic tests for Cards API */
const request = require('supertest');
const app = require('../src/app');

describe('Cards API', () => {
  it('GET /cards returns initial cards', async () => {
    const res = await request(app).get('/cards');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });

  it('POST /cards creates a new card', async () => {
    const newCard = { suit: 'Clubs', value: 'Jack' };
    const res = await request(app).post('/cards').send(newCard);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newCard);
    expect(res.body.id).toBeDefined();
  });

  it('GET /cards/:id returns a single card', async () => {
    const list = await request(app).get('/cards');
    const id = list.body[0].id;
    const res = await request(app).get(`/cards/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it('DELETE /cards/:id removes a card', async () => {
    // First create a card to delete
    const created = await request(app).post('/cards').send({ suit: 'Hearts', value: '10' });
    const id = created.body.id;
    const res = await request(app).delete(`/cards/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.card.id).toBe(id);
  });

  it('returns 404 for missing card', async () => {
    const res = await request(app).get('/cards/99999');
    expect(res.status).toBe(404);
  });
});
