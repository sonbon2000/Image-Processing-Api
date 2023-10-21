import express from 'express';
import { getImagePath } from '../../resize-image';

const images: express.Router = express.Router();

images.get(
  '/',
  async (request: express.Request, response: express.Response) => {
    let error: null | string = '';

    if (error) {
      response.send(error);
      return;
    }

    const path = await getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened :-D What did you do?');
    }
  }
);

export default images;
