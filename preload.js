// preload.js  先于网页内容开始加载的代码
/**
 * 通过预加载脚本从渲染器访问Node.js。

预加载脚本与浏览器共享同一个全局 Window 接口，并且可以访问 Node.js API

预加载脚本在渲染器进程加载之前加载，
并有权访问两个 渲染器全局 (例如 window 和 document) 和 Node.js 环境。
 */

// TODO  这边还不能用
// FIXME  preload 里面使用require nodeIntegration需要设置成true
/**
 *     webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:false ,
      contextIsolation:false
 */
// BUG 
const fs =require("fs");
const path =require('path')


//暴漏api对象给js文件
  const {
    contextBridge,
    ipcRenderer
} = require("electron");

// 暴漏对象和方法给主进程 和渲染进程 渲染进程通过windows拿到属性和事件  主进程那边通过ipc监听事件
contextBridge.exposeInMainWorld(
    "api", {
       'platform':process.platform,
        setTitle: (title) => ipcRenderer.send('set-title', title),
        openFile: () => ipcRenderer.invoke('dialog:openFile')
    }
);


// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })    


  /**
   * 上面的代码访问 Node.js process.versions 对象，并运行一个基本的 replaceText 辅助函数将版本号插入到 HTML 文档中。
    要将此脚本附加到渲染器流程，请在你现有的 BrowserWindow 构造器中将路径中的预加载脚本传入 webPreferences.preload 选项。
   */


