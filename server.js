const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;

// Set a port to the express app
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
