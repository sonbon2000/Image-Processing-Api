import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

// Test endpoints
describe('Test responses endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async () => {
      const res = await request.get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('gets /api/images?filename=bridge', async (): Promise<void> => {
      const res = await request.get('/api/images?filename=bridge');
      expect(res.status).toBe(200);
    });

    it('gets /api/images?filename=bridge&width=200&height=200', async () => {
      const res = await request.get(
        '/api/images?filename=bridge&width=200&height=200'
      );
      expect(res.status).toBe(200);
    });
  });
});
