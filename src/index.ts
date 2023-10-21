const express = require('express');
// import routes from './routes/index';
// import File from './file';

const app = express();
const port: number = 3000;

// Add routes
// app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
  // Make sure that thumb path is available
  //   await File.createThumbPath()

  console.log(`Server started at http://localhost:${port}`);
});

export default app;
