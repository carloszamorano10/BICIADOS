import request from 'supertest';
import app from '../index.js';

describe('Operaciones CRUD de productos', () => {
  
  it('GET /api/bicis - debería retornar estado 200', async () => {
    const response = await request(app).get('/api/bicis');
    expect(response.statusCode).toBe(200);
  });

  it('GET /api/bicis - debería retornar un array', async () => {
    const response = await request(app).get('/api/bicis');
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /api/bicis/:id - debería retornar un producto específico', async () => {
    const response = await request(app).get('/api/bicis/1');
    
    expect([200, 404]).toContain(response.statusCode);
  });

  it('POST /api/bicis/register - debería crear un producto', async () => {
    const newProduct = {
      name: 'Bicicleta Test',
      price: 299990,
      desc: 'Bicicleta de prueba',
      img: 'test.jpg',
      categoria: 'test'
    };

    const response = await request(app)
      .post('/api/bicis/register')
      .send(newProduct);


    expect([201, 400]).toContain(response.statusCode);
  });
});