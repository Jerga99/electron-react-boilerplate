const { BrowserWindow, app, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');
// const crypto = require('crypto')

let win;

const isDev = !app.isPackaged;

const user = JSON.stringify({
  username: 'username',
  password: 'password',
});

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 800,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('user', user);
  });
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

ipcMain.handle('logged-in', (event, logIn) => {
  //generate hashes
  const hash = createHash('sha256');
  const hash2 = createHash('sha256');

  //digest hashes
  const compare1 = hash.update(JSON.stringify(logIn)).digest('hex');
  const compare2 = hash2.update(user).digest('hex');
  // console.log('logIn: \n', compare1)
  // console.log('user obj: \n', compare2)

  //compare hashes
  return compare1 === compare2;
});

ipcMain.on('open-file-dialog', async (event) => {
  var paths = dialog.showOpenDialogSync(win, {
    properties: ['openFile', 'multiSelections'],
  });
});

ipcMain.on('save', async (event, data) => {
  fs.writeFile('/Users/jondonadio/test.txt', data, (err) => {
    if (!err) {
      console.log('file written');
    } else {
      console.log(err);
    }
  });
});

app.whenReady().then(createWindow);
