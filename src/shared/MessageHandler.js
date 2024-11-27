/**
 * Handles message parsing and formatting throughout the application.
 * Provides consistent message handling between client and server.
 */

export class MessageHandler {
  /**
   * Parse incoming message data into a string
   * @param {Buffer} data - The raw message data
   * @returns {string|null} The parsed message or null if parsing fails
   */
  static parse(data) {
    try {
      return data.toString().trim();
    } catch (error) {
      return null;
    }
  }
}