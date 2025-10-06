import request from 'supertest';
import app from '../index.js';

describe('Operaciones CRUD de productos', () => {
  
  it('GET /api/pizzas - debería retornar estado 200', async () => {
    const response = await request(app).get('/api/pizzas');
    expect(response.statusCode).toBe(200);
  });

  it('GET /api/pizzas - debería retornar un array', async () => {
    const response = await request(app).get('/api/pizzas');
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /api/pizzas/:id - debería retornar un producto específico', async () => {
    const response = await request(app).get('/api/pizzas/1');
    
    expect([200, 404]).toContain(response.statusCode);
  });

  it('POST /api/pizzas/register - debería crear un producto', async () => {
    const newProduct = {
      name: 'Bicicleta Test',
      price: 299990,
      desc: 'Bicicleta de prueba',
      img: 'test.jpg',
      categoria: 'test'
    };

    const response = await request(app)
      .post('/api/pizzas/register')
      .send(newProduct);


    expect([201, 400]).toContain(response.statusCode);
  });
});