/**
 * Provides consistent logging functionality across the application.
 * Supports different log levels and context-based logging.
 */

export class Logger {
  /**
   * Create a new logger instance with a specific context
   * @param {string} context - The context identifier for the logger
   */
  constructor(context) {
    this.context = context;
  }

  /**
   * Log informational messages
   * @param {...any} args - The messages to log
   */
  info(...args) {
    console.log(`[${this.context}]`, ...args);
  }

  /**
   * Log error messages
   * @param {...any} args - The error messages to log
   */
  error(...args) {
    console.error(`[${this.context}] ERROR:`, ...args);
  }
}