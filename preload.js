const { ipcRenderer, contextBridge } = require('electron')
const fs = require('fs')
const path = require('path')
const jetpack = require('fs-jetpack')
const crypto = require('crypto')

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message)
    },
  },

  jp: {
    write() {
      // jetpack.write()
      console.log('yo')
    },

    read() {
      // jetpack.read()
      console.log('what up?')
    },

    encrypt() {},

    decrypt() {},
  },
})
contextBridge.exposeInMainWorld('login', {
  loginCreds: {
    async loggedIn(user) {
      const logCheck = await ipcRenderer.invoke('logged-in', user)

      if (logCheck === true) {
        console.log('inside function: ', true)
        return true
      }
      console.log('inside function: ', false)
      return false
    },
  },
})

// ipcRenderer.on('user', (event, user) => {
//   console.log(JSON.parse(user))
// })
