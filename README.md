# Node.js Real-Time Chat Application

A lightweight, real-time chat application built with Node.js using the native `net` module. This application demonstrates concurrent client-server communication using TCP sockets.

## Features

- Real-time message broadcasting
- Support for multiple concurrent clients
- Clean text-based user interface
- Robust error handling and connection management
- Timestamp-based message formatting
- Graceful client disconnection handling

## Project Structure

```
src/
├── client/
│   ├── ChatClient.js    # Client implementation
│   └── index.js         # Client entry point
├── server/
│   ├── ChatServer.js    # Server implementation
│   ├── ClientManager.js # Client connection management
│   └── index.js         # Server entry point
└── shared/
    ├── Logger.js        # Logging utility
    └── MessageHandler.js # Message parsing utility
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the server:
```bash
npm run start:server
```

2. In a separate terminal, start a client:
```bash
npm run start:client
```

You can start multiple clients by running the client command in different terminal windows.

## Architecture

### Server Architecture

The server is built using a modular architecture with clear separation of concerns:

- `ChatServer`: Handles TCP server initialization and new connection acceptance
- `ClientManager`: Manages connected clients and message broadcasting
- Event-driven architecture using Node.js's built-in EventEmitter

### Concurrency Handling

The application handles concurrency through:
- Asynchronous I/O operations using Node.js's event loop
- Non-blocking message broadcasting
- Thread-safe client management using Map data structure
- Event-driven architecture for handling multiple client connections

### Client Architecture

The client implementation features:
- Clean separation between connection handling and user interface
- Robust error handling for network issues
- Non-blocking I/O for sending and receiving messages
- Interactive command-line interface with real-time updates

## Design Choices

1. **Native Modules**
   - Used Node.js's built-in `net` module instead of external libraries
   - Ensures minimal dependencies and better control over network communication

2. **Message Format**
   - Simple text-based protocol for message exchange
   - Timestamps added server-side for consistency
   - Messages are line-delimited for easy parsing

3. **Error Handling**
   - Comprehensive error handling at both client and server level
   - Automatic cleanup of disconnected clients
   - Graceful shutdown mechanisms

4. **State Management**
   - Server maintains minimal state using Map data structure
   - Clients are identified by unique IDs
   - Clean separation between connection and message handling

5. **Logging**
   - Structured logging system for debugging and monitoring
   - Context-based log messages for better traceability
   - Separate error and info logging levels

## Usage

1. Start typing messages after connecting
2. Press Enter to send a message
3. Type 'exit' to disconnect
4. Messages from other clients appear automatically
5. Each message includes a timestamp

## Limitations

- Basic text-only communication
- No persistent message history
- No user authentication/authorization
- No private messaging
- Local network usage only (localhost)

## Future Improvements

- Add user authentication
- Implement private messaging
- Add persistent message history
- Support for rich media content
- Add room-based chat functionality
- Implement secure communication (TLS)