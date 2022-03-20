const { BrowserWindow, app, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { createHash, Cipher } = require('crypto');
var CryptoJS = require('crypto-js');
var AES = require('crypto-js/aes');
var SHA256 = require('crypto-js/sha256');
// const crypto = require('crypto')

let win;

const isDev = !app.isPackaged;

const user = JSON.stringify({
  username: '',
  password: '',
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

  //compare hashes
  return compare1 === compare2;
});

ipcMain.on('save', async (event, data) => {
  let ciphertext = CryptoJS.AES.encrypt(data, 'secret key 123').toString();
  fs.writeFile('/Users/jondonadio/test.txt', ciphertext, (err) => {
    if (!err) {
      console.log('file written');
    } else {
      console.log(err);
    }
  });
});

ipcMain.handle('open-file-dialog', (event, config) => {
  try {
    let path = dialog.showOpenDialogSync(win, config)[0];
    console.log(path);

    if (path === undefined) {
      console.log('undefined path!');
      event.returnValue = undefined;
      return;
    }
    let file = fs.readFileSync(path);
    return file.toString();
  } catch (error) {
    console.log(error);
  }
});

// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var originalText = bytes.toString(CryptoJS.enc.Utf8);

app.whenReady().then(createWindow);
