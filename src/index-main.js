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
import log from '~utils/logger/logger';


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
}
const appVersion = process.env.npm_package_version;

// Reference to the main app window
let win;


// -----------------------------------------------------------------------------
// INIT
// -----------------------------------------------------------------------------

const createWindow = function createWindow() {
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

log.info('Initializing main process', { tag: 'app' });
app.on('ready', createWindow);
