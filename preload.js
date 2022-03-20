const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    },
  },

  jp: {
 
    async openFile() {
      // jetpack.read()
      const data = await ipcRenderer.invoke('open-file-dialog');
      console.log(data);
      return data;
    },

    sendData(data) {
      ipcRenderer.send('save', data);
    },

    encrypt() {},

    decrypt() {},
  },
});
contextBridge.exposeInMainWorld('login', {
  loginCreds: {
    async loggedIn(user) {
      const logCheck = await ipcRenderer.invoke('logged-in', user);
      if (logCheck === true) {
        return true;
      }
      return false;
    },
  },
});

ipcRenderer.on('fileData', (event, data) => {
  console.log(data);
});
