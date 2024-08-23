
const path = require('path');

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const creater = require('./creater/index.js')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

ipcMain.on('window-close', () => {
  app.exit()
})

ipcMain.on('window-min', function() {
  mainWindow.minimize();
})

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    resizable: true,
    // maximizable: tr,
    width: 800, height: 800,
    // frame: false,
    title: 'EST Config Creater', 
    icon: path.join(__dirname, 'favicon.ico'),
    webPreferences: {
      // nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // mac快捷键
  if (process.platform === 'darwin') {
    var template = [{
      label: "Application",
      submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Relaunch", accelerator: "Command+R", click: function () { mainWindow.reload() } }
      ]
    }, {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  } else {
    Menu.setApplicationMenu(null)
  }

  // and load the index.html of the app.
  // 开发环境
  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:3939/')
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    // 打包环境
    mainWindow.loadFile('./dist/index.html')
  }


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// 监听来自渲染进程的消息
ipcMain.on('create', (event, message) => {
  console.log(`Received message from renderer: ${message}`);
  var data = JSON.parse(message || '{}' )
  let result = creater({...data})
  event.returnValue = result;
});

// 主进程
ipcMain.on("ping", (event, arg) => {
  console.log(arg); // whoooooooh
});

// 如果你只想同时运行一个程序的时候
// const gotTheLock = app.requestSingleInstanceLock()
// if (!gotTheLock) {
//   app.quit()
// } else {
//   app.on('second-instance', (event, commandLine, workingDirectory) => {
//     // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
//     if (mainWindow) {
//       if (mainWindow.isMinimized()) mainWindow.restore()
//       mainWindow.focus()
//       mainWindow.show()
//     }
//   })
// }