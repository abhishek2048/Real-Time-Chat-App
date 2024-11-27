/**
 * Server entry point that initializes and starts the chat server.
 * This file keeps the main server initialization simple and delegates
 * the actual server logic to the ChatServer class.
 */

import { ChatServer } from './ChatServer.js';

// Configure server port - could be moved to environment variables for production
const PORT = 3000;

// Initialize and start the chat server
const server = new ChatServer(PORT);
server.start();