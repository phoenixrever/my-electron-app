// preload.js  先于网页内容开始加载的代码
/**
 * 通过预加载脚本从渲染器访问Node.js。

预加载脚本与浏览器共享同一个全局 Window 接口，并且可以访问 Node.js API

预加载脚本在渲染器进程加载之前加载，
并有权访问两个 渲染器全局 (例如 window 和 document) 和 Node.js 环境。
 */

// BUG  这边还不能用
// FIXME  preload 里面使用require nodeIntegration需要设置成true
/**
 *     webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true ,
 */
const fs =require("fs");
const path =require('path')
console.log(fs);
console.log(path);


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
        openFile: () => ipcRenderer.invoke('dialog:openFile'),
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

// Electron 中的消息端口

// MessagePorts are created in pairs. 连接的一对消息端口
// 被称为通道。
const channel = new MessageChannel()

// port1 和 port2 之间唯一的不同是你如何使用它们。 消息
// 发送到port1 将被port2 接收，反之亦然。
const port1 = channel.port1
const port2 = channel.port2

// 允许在另一端还没有注册监听器的情况下就通过通道向其发送消息
// 消息将排队等待，直到一个监听器注册为止。
port2.postMessage({ answer: 42 })

// 简单来说就是 注册2个port 一个是发送端port2 一个是接收端 port1 这边是把接受端port1给main 自己拿着发送端port2发消息
ipcRenderer.postMessage('port', null, [port1])