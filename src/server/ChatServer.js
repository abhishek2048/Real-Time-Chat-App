/**
 * Main server class that handles the TCP server initialization and client connections.
 * Responsible for setting up the server and delegating client management to ClientManager.
 */

import { createServer } from 'net';
import { ClientManager } from './ClientManager.js';
import { MessageHandler } from '../shared/MessageHandler.js';
import { Logger } from '../shared/Logger.js';

export class ChatServer {
  /**
   * Initialize the chat server with a specific port
   * @param {number} port - The port number to listen on
   */
  constructor(port) {
    this.port = port;
    this.clientManager = new ClientManager();
    this.logger = new Logger('Server');
  }

  /**
   * Start the TCP server and begin listening for connections
   */
  start() {
    const server = createServer((socket) => {
      this.handleNewConnection(socket);
    });

    server.listen(this.port, () => {
      this.logger.info(`Chat server listening on port ${this.port}`);
    });

    server.on('error', (error) => {
      this.logger.error('Server error:', error);
    });
  }

  /**
   * Handle new client connections and set up event listeners
   * @param {net.Socket} socket - The client's socket connection
   */
  handleNewConnection(socket) {
    this.logger.info('New client connected');
    
    const client = this.clientManager.addClient(socket);
    
    // Handle incoming messages
    socket.on('data', (data) => {
      const message = MessageHandler.parse(data);
      if (message) {
        this.clientManager.broadcast(message, client.id);
      }
    });

    // Handle client disconnection
    socket.on('end', () => {
      this.logger.info('Client disconnected');
      this.clientManager.removeClient(client.id);
    });

    // Handle connection errors
    socket.on('error', (error) => {
      this.logger.error('Socket error:', error);
      this.clientManager.removeClient(client.id);
    });
  }
}