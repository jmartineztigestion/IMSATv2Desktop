const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");

class MainScreen {
  window;
  position = {
    width: 1300,
    height: 750,
    minWidth: 550,
    minHeight: 400
  };

  constructor() {
    this.window = new BrowserWindow({
      width: this.position.width,
      height: this.position.height,
      minWidth: this.position.minWidth,
      minHeight: this.position.minHeight,
      resizable: true, 
      title: "IMSAT",
      titleBarStyle: 'hidden',
      maximizable: true,
      frame:false,
      titleBarOverlay: {
        color: '#00FF0000',
        symbolColor: 'black',
        height: 10
      },
      acceptFirstMouse: true,
      autoHideMenuBar: true,
      show: false,
      webPreferences: {    
        webviewTag: true,
        webSecurity: false,
        contextIsolation: true,
        preload: path.join(__dirname, "./mainPreload.js"),
      },
    });

    this.window.once("ready-to-show", () => {
      this.window.show();
       
      if (this.position.maximized) {
        this.window.maximize();
      }
    });

    this.handleMessages();

    let wc = this.window.webContents;
    //wc.openDevTools({ mode: "undocked" });
    //this.window.loadURL('https://imsat.info')

    this.window.loadFile("./imsat/main/main.html");
  }

  showMessage(message) {
    console.log("showMessage trapped");
    console.log(message);
    this.window.webContents.send("updateMessage", message);
  }

  close() {
    this.window.close();
    ipcMain.removeAllListeners();
  }
  maximizable(){
    this.window.maximizable();

  }
  hide() {
    this.window.hide();
  }

  handleMessages() {
    //Ipc functions go here.
   
  }
}

module.exports = MainScreen;
