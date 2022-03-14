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

// ipcRenderer.on('user', (event, user) => {
//   console.log(JSON.parse(user))
//   const userasdfasdf = JSON.parse(user)
// })
