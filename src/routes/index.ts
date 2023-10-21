import express from 'express';
import images from './api/images';

const routes = express.Router();
const data =
  '<h1>Image processing</h1><p>Access above link to handle image:<ul><li>Image full: <a href="/api/images?filename=bridge">/api/images?filename=bridge</a></li><li>Image resize: <a href="/api/images?filename=bridge&width=200&height=200">/api/images?filename=bridge&width=200&height=200</a></li></ul></p>';

routes.use('/api/images', images);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.send(data);
  }
);

export default routes;
