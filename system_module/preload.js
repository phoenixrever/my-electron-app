
//暴漏api对象给js文件
  const {
    contextBridge,
    ipcRenderer
} = require("electron");

// 暴漏对象和方法给主进程 和渲染进程 渲染进程通过windows拿到属性和事件  主进程那边通过ipc监听事件
contextBridge.exposeInMainWorld(
    "api", {
       'showContextMenu':()=>ipcRenderer.send('show-context-menu'),
       'openKBJ':()=>ipcRenderer.send('open-kbj'),
    }
);