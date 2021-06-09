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

// External/third party dependencies
const fs = require('fs');
const path = require('path');
const {
  app,
  BrowserWindow
} = require('electron');

// Internal dependencies
import {
  APP,
  ERROR
} from '~/constants';
import log from '~utils/logger/logger';
import { initORM, initORMModels } from '~services/orm/orm';


// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------

// Set application name and version
let appName;
const pathPackageJSON = path.resolve('./package.json');
if (fs.existsSync(pathPackageJSON)) {
  const packageJSON = JSON.parse(fs.readFileSync(pathPackageJSON));

  appName = packageJSON.productName || packageJSON.name;
  app.setName(appName);
  app.setPath('userData', path.join(app.getPath('appData'), appName));
  app.setPath('cache', path.join(app.getPath('cache'), appName));
  app.setPath('logs', path.join(app.getPath('logs'), appName));
}
const appVersion = process.env.npm_package_version;

/**
 * Reference to the main application window
 *
 * @type {BrowserWindow}
 */
let win;


// -----------------------------------------------------------------------------
// WINDOW MANAGEMENT
// -----------------------------------------------------------------------------

/**
 * Creates the main application window and loads the webpage to display.
 *
 * NOTE: Only a valid approach during development.
 */
const createMainAppWindow = () => {
  win = new BrowserWindow({
    height: 960,
    title: `${appName} v${appVersion}`,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
    width: 1200
  });

  if (process.env.NODE_ENV === 'development') {
    win.webContents.on('devtools-opened', () => {
      win.loadURL('https://127.0.0.1:3000');
    });
    win.webContents.openDevTools();
  } else if (process.env.NODE_ENV === 'production') {
    // @TODO
  } else if (process.env.NODE_ENV === 'test') {
    // @TODO
  } else {
    console.error(`Invalid process.env.NODE_ENV "${process.env.NODE_ENV}"`);
  }
};


// -----------------------------------------------------------------------------
// APPLICATION START
// -----------------------------------------------------------------------------

app.whenReady().then(
  () => {
    log.info('Electron is ready -> initializing main process', { tag: 'app' });

    const pathUserData = app.getPath('userData');
    const orm = initORM(`${pathUserData}${APP.DB_PATH}${APP.DB_FILE}`);
    if (orm) {
      initORMModels().then(
        () => {
          createMainAppWindow();
        },
        () => {
          log.error(ERROR.APP.INIT_FAIL);
        }
      );
    }
  }
);
