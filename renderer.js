//我们是不能在js里面调用nodejs的
//Uncaught ReferenceError: require is not defined
// const file =require("fs");

//接受 preload contextBridge 暴漏出来的对象
// console.log(window.api);

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    //渲染进程发送事件
    window.api.setTitle(title)
});

const btn2 = document.getElementById('btn2')
const filePathElement = document.getElementById('filePath')
btn2.addEventListener('click', async () => {
    const filePath = await window.api.openFile()
    filePathElement.innerText = filePath
  })
  
  