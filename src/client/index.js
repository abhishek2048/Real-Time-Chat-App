/**
 * Client entry point that initializes and connects the chat client.
 * Configures the connection parameters and starts the client.
 */

import { ChatClient } from './ChatClient.js';

// Connection configuration - could be moved to environment variables
const HOST = 'localhost';
const PORT = 3000;

// Initialize and connect the chat client
const client = new ChatClient(HOST, PORT);
client.connect();