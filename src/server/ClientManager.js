/**
 * Manages connected clients and handles message broadcasting.
 * Provides functionality for adding/removing clients and broadcasting messages.
 */

import { Logger } from '../shared/Logger.js';

export class ClientManager {
  constructor() {
    // Store clients in a Map for O(1) access and deletion
    this.clients = new Map();
    this.logger = new Logger('ClientManager');
  }

  /**
   * Add a new client to the manager
   * @param {net.Socket} socket - The client's socket connection
   * @returns {Object} The created client object with id and socket
   */
  addClient(socket) {
    const id = Math.random().toString(36).substring(7);
    const client = { id, socket };
    this.clients.set(id, client);
    return client;
  }

  /**
   * Remove a client from the manager
   * @param {string} id - The client's unique identifier
   */
  removeClient(id) {
    this.clients.delete(id);
  }

  /**
   * Broadcast a message to all connected clients except the sender
   * @param {string} message - The message to broadcast
   * @param {string} senderId - The ID of the sending client to exclude
   */
  broadcast(message, senderId) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}`;

    for (const [id, client] of this.clients.entries()) {
      if (id !== senderId) {
        try {
          client.socket.write(formattedMessage + '\n');
        } catch (error) {
          this.logger.error(`Error broadcasting to client ${id}:`, error);
          this.removeClient(id);
        }
      }
    }
  }
}