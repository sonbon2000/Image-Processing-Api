// Lib import
import express from 'express';

// File import
import {
  createThumb,
  getImagePath,
  isThumbAvailable,
  validateFilePath
} from '../../resize-image';

const images: express.Router = express.Router();

images.get(
  '/',
  async (request: express.Request, response: express.Response) => {
    const validateMessage: null | string = await validateFilePath(
      request.query
    );
    if (validateMessage) {
      response.send(validateMessage);
      return;
    }

    let error: null | string = '';

    if (!(await isThumbAvailable(request.query))) {
      error = await createThumb(request.query);
    }

    if (error) {
      response.send(error);
      return;
    }

    const path = await getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('Error happen');
    }
  }
);

export default images;
