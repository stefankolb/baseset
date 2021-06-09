/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 */

/**
 * @module utils/logger
 *
 * @description
 * Configuration for loglevel.
 */

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// External/Third party dependencies
import loglevel from 'loglevel';


// -----------------------------------------------------------------------------
// CONFIGURE
// -----------------------------------------------------------------------------

// Initialize app wide logging
const log = loglevel.getLogger('app');
log.setDefaultLevel(log.levels.DEBUG);

const originalFactory = log.methodFactory;

// Plugin to apply tags/prefixes to log messages as well as append a new object
// that contains information about the logger itself
log.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return (...args) => {
    const messages = [ ];

    // If a tag property has been provided, we use it as marker for the
    // log output
    const lastMessage = args[args.length - 1];
    if (lastMessage && lastMessage.constructor === Object) {
      if (lastMessage.tag) {
        messages.push(`[${lastMessage.tag}]`);
        delete lastMessage.tag;

        if (Object.keys(lastMessage).length === 0) {
          args = args.slice(0, args.length - 1);
        }
      }
    }

    // Apply all remaining messages
    for (let i = 0, ii = args.length; i < ii; i++) {
      messages.push(args[i]);
    }

    // Finally, add a new object with logger information
    messages.push('\n');
    messages.push({
      logLevel,
      logLevelName: Object.keys(log.levels).find(
        key => log.levels[key] === logLevel
      ),
      loggerName,
      timestamp: new Date().toISOString().replace(/[a-zA-Z]/g, ' ').trim()
    });

    rawMethod.apply(this, messages);
  };
};

// Apply plugin(s)
log.setLevel(log.getLevel());


// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------

export default log;
