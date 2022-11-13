const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      //允许在js种使用nodejs  sandbox环境  注意  preload 里面使用require 不是electron的第三方库 需要设置成true
      nodeIntegration: false,
      //主进程（nodejs）与渲染进程(js)隔离的 下才能使用contextBridge
      contextIsolation: true,
    },
  });

  //引入自定义菜单和右键menu
  require('./menu/index')

  

  mainWindow.loadFile("index.html");

  // 打开开发工具 F12
  mainWindow.webContents.openDevTools();
};

ipcMain.on('openKBJ',()=>{
  mainWindow.loadURL("https://kbjfree.com/watch/FzHl4vqM0mA");
})


app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
