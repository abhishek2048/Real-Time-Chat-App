/**
 * Implements the chat client functionality including connection management
 * and user interface handling.
 */

import { connect } from 'net';
import { createInterface } from 'readline';
import { Logger } from '../shared/Logger.js';

export class ChatClient {
  /**
   * Initialize the chat client with connection details
   * @param {string} host - The server's hostname
   * @param {number} port - The server's port number
   */
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.logger = new Logger('Client');
  }

  /**
   * Establish connection to the chat server and set up handlers
   */
  connect() {
    this.socket = connect(this.port, this.host);
    this.setupSocketHandlers();
    this.setupUserInterface();
  }

  /**
   * Set up event handlers for the socket connection
   */
  setupSocketHandlers() {
    // Handle successful connection
    this.socket.on('connect', () => {
      this.logger.info('Connected to chat server');
      console.log('Type your messages and press Enter to send. Type "exit" to quit.\n');
    });

    // Handle incoming messages
    this.socket.on('data', (data) => {
      // Clear the current line to prevent interference with input
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log(data.toString().trim());
      // Reprint the prompt
      process.stdout.write('> ');
    });

    // Handle server disconnection
    this.socket.on('end', () => {
      this.logger.info('Disconnected from server');
      process.exit(0);
    });

    // Handle connection errors
    this.socket.on('error', (error) => {
      this.logger.error('Connection error:', error);
      process.exit(1);
    });
  }

  /**
   * Set up the command-line interface for user input
   */
  setupUserInterface() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    });

    rl.prompt();

    // Handle user input
    rl.on('line', (line) => {
      const message = line.trim();
      if (message.toLowerCase() === 'exit') {
        this.socket.end();
        process.exit(0);
      }

      if (message) {
        this.socket.write(message);
      }
      rl.prompt();
    });

    // Handle interface closure
    rl.on('close', () => {
      this.socket.end();
      process.exit(0);
    });
  }
}