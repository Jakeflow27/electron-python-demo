const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const { ipcMain } = require('electron') // used to communicate asynchronously from the main process to renderer processes.


// This is the main electron node.js script which can spawn windows

/*************************************************************
 * window management
 *************************************************************/

let mainWindow = null

const createWindow = () => {

  mainWindow = new BrowserWindow({width: 1280, height: 720})

  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// this is the event listener that will respond when we will request it in the web page
ipcMain.on("toggle-dev-tools", (event, arg) => {
  console.log(arg,event);
  event.returnValue = "ok";
  if (mainWindow.webContents.isDevToolsOpened()){
    mainWindow.webContents.closeDevTools();
  } else {
    mainWindow.webContents.openDevTools();
  }
});