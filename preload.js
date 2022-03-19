const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    },
  },

  jp: {
    selectFile() {
      // jetpack.write()
      ipcRenderer.send('open-file-dialog');
    },

    readData(data) {
      // jetpack.read()
      const returnData = ipcRenderer.invoke('read', data);
      return returnData;
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

// ipcRenderer.on('user', (event, user) => {
//   console.log(JSON.parse(user))
// })
