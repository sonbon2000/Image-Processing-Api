// Lib import
const express = require('express');

// File Import
import { createThumbPath } from './resize-image';
import routes from './routes/index';

const app = express();
const port: number = 3000;

app.use(routes);

// Start server at port 3000
app.listen(port, async () => {
  await createThumbPath();
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
