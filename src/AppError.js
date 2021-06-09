/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 */

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// External/Third-party dependencies
import logger from '~utils/logger/logger';


// -----------------------------------------------------------------------------
// APPLICATION ERROR CLASS
// -----------------------------------------------------------------------------

/**
 * Custom error class for application wide error handling
 *
 * @example
 * throw new AppError('Something bad happened', {
 *   detail: {
 *     property: 'value'
 *   },
 *   tag: 'SomeModuleName'
 * });
 */
class AppError extends Error {

  /**
   * Creates a new instance of the `AppError` class. By default, when
   * an instance of this error class is created, we log the error to the
   * configured logger. This way, even though the error might by caught, there
   * is some information that the error was thrown visible.
   *
   * @param {string} message
   *        An error message, also used when displaying the error
   * @param {object} [params={ }]
   *        Additional, arbitrary properties of the error
   * @param {object} [params.detail=null]
   *        Detailed information about the error
   * @param {boolean} [params.silent=false]
   *        Whether or not information will be logged automatically
   * @param {string} [params.tag='error/app']
   *        A tag to display at the beginning of the error message
   */
  constructor(message, params = { }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.name = 'AppError';
    this.message = message;
    this.detail = params.detail || null;
    this.silent = params.silent || false;
    this.tag = params.tag || 'error/app';

    if (this.silent === false) {
      this.writeToLogger();
    }
  }


  /**
   * Writes the error message and optional arguments to the log.
   */
  writeToLogger() {
    logger.error(this.message, {
      tag: this.tag,
      ...this.detail
    });
  }
}


// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------

export default AppError;
