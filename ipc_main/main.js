// main.js

// Modules to control application life and create native browser window
// app 模块，它控制应用程序的事件生命周期。
// BrowserWindow 模块，它创建和管理应用程序 窗口。

/**
 * Electron 遵循 JavaScript 传统约定，以帕斯卡命名法 (PascalCase) 命名可实例化的类 (如 BrowserWindow, Tray 和 Notification)，
 * 以驼峰命名法 (camelCase) 命名不可实例化的函数、变量等 (如 app, ipcRenderer, webContents) 。
 */

const { app, dialog, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    /**
     * 这里使用了两个Node.js概念：
            __dirname 字符串指向当前正在执行脚本的路径 (在本例中，它指向你的项目的根文件夹)。
            path.join API 将多个路径联结在一起，创建一个跨平台的路径字符串。
        我们使用一个相对当前正在执行JavaScript文件的路径，这样您的相对路径将在开发模式和打包模式中都将有效。
     */
    webPreferences: {
      //预加载脚本可以在 BrowserWindow 构造方法中的 webPreferences 选项里被附加到主进程。
      preload: path.join(__dirname, "preload.js"),
      
      //允许在js种使用nodejs  sandbox环境  注意  preload 里面使用require 需要设置成true
      nodeIntegration: false,
      //主进程（nodejs）与渲染进程(js)隔离的 下才能使用contextBridge
      contextIsolation: true,
    },
  });

  // 加载 index.html 窗口显示的内容可以是本地HTML文件，也可以是一个远程url。
  mainWindow.loadFile("index.html");
  // mainWindow.loadURL('https://javbooks.com/serchinfo_censored/262/categorybt_1.htm')

  // 打开开发工具 F12
  mainWindow.webContents.openDevTools();
};

//   渲染器进程到主进程（双向 有返回值）
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    return;
  } else {
    return filePaths[0];
  }
}

//主进程接受渲染进程的事件
ipcMain.on("set-title", (event, title) => {
  //下面这段代码的作用是改变app标题
  const webContents = event.sender;
  //FIXME ipcMain 的console 是输出到控制台不是浏览器
  console.log("webContents", webContents);
  const api = BrowserWindow.fromWebContents(webContents);
  console.log("api", api);
  api.setTitle(title);
});

//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
// 这段程序将会在 Electron 初始化结束和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  //   渲染器进程到主进程（双向）
  ipcMain.handle("dialog:openFile", handleFileOpen);

  ipcMain.on("counter-value", (_event, value) => {
    console.log(value); // will print value to Node console
  });

  //Electron 中的消息端口
  // In the main process, we receive the port.
  ipcMain.on("port", (event) => {
    // 当我们在主进程中接收到 MessagePort 对象, 它就成为了
    // MessagePortMain.
    const port = event.ports[0];

    // MessagePortMain 使用了 Node.js 风格的事件 API, 而不是
    // web 风格的事件 API. 因此使用 .on('message', ...) 而不是 .onmessage = ...
    port.on("message", (event) => {
      // 收到的数据是： { answer: 42 }
      const data = event.data;
      console.log('receive port data:',data);
    });

    // MessagePortMain 阻塞消息直到 .start() 方法被调用
    port.start();
  });

  createWindow();

  /**
   *macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，
   * 并且在没有窗口可用的情况下激活应用时会打开新的窗口。
   */
  app.on("activate", () => {
    // Electron 目前只支持三个平台：win32 (Windows), linux (Linux) 和 darwin (macOS) 。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  //你可以使用 进程 全局的 platform 属性来专门为某些操作系统运行代码。
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
