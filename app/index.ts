import debug from 'debug';
import dotenv from 'dotenv';
import http from 'http';
import { AddressInfo } from 'net';
import app from './app';
dotenv.config();

const serverDebug = debug('starter:server');
let serverStarted = false;
/**
 * Get port from environment and store in Express.
 */
const DEFAULT_PORT = 3000;
const port = normalizePort(process.env.PORT || DEFAULT_PORT.toString()) as string | number;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server: http.Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
startServer(port);

function startServer(port: string | number) {
  server.listen(port);
  server.on('error', (error: NodeJS.ErrnoException) => onError(error, port));
  server.on('listening', onListening);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string | number): string | number | boolean {
  const parsedPort: number = parseInt(val as string, 10);

  if (isNaN(parsedPort)) {
    // named pipe
    return val;
  }

  if (parsedPort >= 0) {
    // port number
    return parsedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException, port: string | number): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      const nextPort = (typeof port === 'number' ? port : parseInt(port)) + 1;
      console.log(`Port ${port} is in use, attempting to use next port: ${nextPort}`);
      startServer(nextPort);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event. 
 */
function onListening(): void {
  if (!serverStarted) {
    serverStarted = true;
    const addr = server.address();
    if (addr && typeof addr === 'object') {
      const bind: string = 'port ' + (addr as AddressInfo).port;
      const url = `http://127.0.0.1:${(addr as AddressInfo).port}`;
      console.log(`Listening on ${bind}`);
      console.info(`Server running at ${url}`);
      serverDebug('Listening on ' + bind);
    }
  }
}
